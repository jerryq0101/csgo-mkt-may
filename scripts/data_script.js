import dotenv from "dotenv";
dotenv.config();
import data from "../misc/items_list.json" assert { type: 'json' };
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_CONNECTION_STRING;
const apikey = process.env.STEAM_API_KEY;
const steamApiUrl = "https://api.steamapis.com/market/item/730/";

// Connect operation to MongoDB, should return a necessary object of needed elements
async function setup() {

    // Mongo Client object
    const client = new MongoClient(uri);

    await client.connect();

    const dbName = "items-data";
    const collectionName = "properties";

    // Create references to the database and collection in order to run
    // operations on them.
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    if (collection == null || client == null) {
        throw new Error("Failed to setup MongoDB");
    }

    return {
        collection,
        client
    };
}

// MongoDB Operations
async function insertMongoDB(data, collection, client) {
    try {
        // Insert one specific item to the collection
        await collection.insertOne(data);
        console.log(`Successfully inserted ${data.name} into the collection`);
    } catch (error) {
        throw new Error(`Failed to insert data into the collection: ${error}`);
    }
}

async function updatePricesMongoDB(itemName, collection, client) {
    console.log("Updating prices for item:", itemName);
    const replacementPrices = await queryPrice(itemName);
    try {
        await collection.replaceOne({ name: itemName }, {
            name: itemName,
            price_history: replacementPrices
        });
        console.log("Successfully replaced previous price data for item:", itemName);
    } catch (error) {
        throw new Error(`Failed to replace previous prices for item (Mongo Replace): ${itemName}`, error);
    }
}

async function existsInCollection(itemName, collection) {
    const query = { name: itemName };
    const result = await collection.findOne(query);
    return result;
}

let minuteRequests = 0;
let dailyRequests = 0;

async function queryPrice(itemName) {
    // Handle API Limits
    if (minuteRequests >= 100) {
        // If we've hit the rate limit for the minute, wait until the next minute
        await delay(60000);
        minuteRequests = 0;
    }

    // For clean request starts
    if (dailyRequests >= 5000) {
        // If we've hit the rate limit for the day, wait until the next day
        await delay(86400000);
        dailyRequests = 0;
    }

    // GET Request to SteamAPI
    const response = await fetch(steamApiUrl + itemName + `?api_key=${apikey}` + `&median_history_days=10000`);

    // For unclean request starts
    if (response.status == 429) {
        console.log(response);
        await delay(86400000);
        dailyRequests = 0;
    } else if (response.status != 200) {
        throw new Error("Failed to fetch data, automatically returning, not 200 or 429 error codes", response);
    } else {
        minuteRequests++;
        dailyRequests++;
    }

    const responseJson = await response.json();

    // Reformat the array to be more readable
    let itemPriceHistoryObjFormArr = []
    for (const instance of responseJson.median_avg_prices_10000days) {
        // Process the date
        let dateFormatted = convertEnglishToDate(instance[0]);
        const medianPrice = instance[1];
        const volume = instance[2];
        itemPriceHistoryObjFormArr.push({
            date: dateFormatted,
            median_price: medianPrice,
            volume: volume
        });
    }

    return itemPriceHistoryObjFormArr;
}

// Pure Utility Functions
function convertEnglishToDate(englishDate) {
    const dateArr = englishDate.split(" ");

    if (dateArr.length != 3) {
        throw new Error("Invalid date format")
    }

    let month = 0;
    if (dateArr[0] == "Jan") {
        month = 1;
    } else if (dateArr[0] == "Feb") {
        month = 2;
    } else if (dateArr[0] == "Mar") {
        month = 3;
    } else if (dateArr[0] == "Apr") {
        month = 4;
    } else if (dateArr[0] == "May") {
        month = 5;
    } else if (dateArr[0] == "Jun") {
        month = 6;
    } else if (dateArr[0] == "Jul") {
        month = 7;
    } else if (dateArr[0] == "Aug") {
        month = 8;
    } else if (dateArr[0] == "Sep") {
        month = 9;
    } else if (dateArr[0] == "Oct") {
        month = 10;
    } else if (dateArr[0] == "Nov") {
        month = 11;
    } else if (dateArr[0] == "Dec") {
        month = 12;
    }

    return `${dateArr[2]}-${month}-${dateArr[1]}`;
}

function isLatestPrices(data) {
    // check for like 4 days behind
    const lastDay = data[data.length - 1];
    const dateString = lastDay.date;
    const date = new Date(dateString);
    const today = new Date();

    // Check that the difference between the last date and today is less than 4 days
    return today - date <= 345600000;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// fetchData()
// Objective: 
// to populate priceData for each possible csgo item, 
// and if the item already exists in the collection, check if the prices 
// are within the last 4 days, if not, update the prices.
// Guidelines: 
// Failure to fetch data for one item stops the entire script, whether the item already exists in the collection or not.
    // A response code other than 429 returns the status code (Caught using Number.isInteger() checks)
    // queryPrice() function handles 429 responses by waiting until the next day to fetch data
// Failure for MongoDB operations are not yet handled
// This script should be run once every week (Allowing for all items to be fetched in API rate limits, and prices to not be too behind)

async function fetchData() {
    const itemsWithProperties = data.data;
    const itemsStrings = itemsWithProperties.map(item => item.market_hash_name);

    // Setup Mongo
    const { collection, client } = await setup();

    // // Single Write Operation to MongoDB 
    // console.log("Begin process")
    // const itemName = "AK-47 | Redline (Field-Tested)"
    // const stepOne = await queryPrice(itemName);
    // console.log(stepOne)
    // const stepTwo = await writeMongoDB({
    //     name: itemName,
    //     price_history: stepOne
    // }, collection, client)
    // console.log("End Process", stepTwo)

    // Loop through each existing csgo item and add it to the collection
    for (const item of itemsStrings) {
        console.log("Processing item:", item);
        // Check if the item has already been added to the collection
        const exists = await existsInCollection(item, collection);
        
        // if exists, update prices
        if (exists) {
            // Check if the item has the latest date prices
            if (!isLatestPrices(exists.price_history)) {
                // If the item doesn't have the latest prices, update the prices
                await updatePricesMongoDB(item, collection, client);
                console.log("Successfully updated prices for item:", item);
            } else {
                console.log("Item prices are the latest in collection:", item);
                continue;
            }
        // if doesn't exist, insert new item
        } else {
            // Within minute and daily limits, fetch data for the item and store it.
            try {
                const data = await queryPrice(item);
    
                await insertMongoDB({
                    name: item,
                    price_history: data
                }, collection, client);
                console.log("Successfully gotten new data for a new item:", item);
            } catch (error) {
                console.error(`Failed to get for the new item: ${item}`, error);
                return;
            }
        }
    }

    // Why running the program was returning an client closed error:
    // Sol'n: Because the linear execution process of non await lines,
    // when calling collection.insertOne(), the operation is a process that isn't finished yet
    // thus causing the client.close() to be called before the insertOne() operation is finished
    // so make sure to await any operation that is dealing with external resources.
    await client.close();
}

fetchData();