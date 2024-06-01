import dotenv from "dotenv";
dotenv.config();
import data from "../misc/items_list.json" assert { type: 'json' };
import specificData from "../misc/specific_item.json" assert { type: 'json' };
import { MongoClient } from "mongodb";
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

async function queryPrice(itemName) {
    // Condition: 
    // Unless the response is 429, or not 200, the function returns an array of objects (name and price)
    // Otherwise, it throws an error and stops the whole program

    // GET Request to SteamAPI 
    let response = await fetch(steamApiUrl + itemName + `?api_key=${apikey}` + `&median_history_days=10000`);

    if (response.status == 429) {
        // If we've hit the rate limit for the day/minute, wait until the next day/minute to continue
        // Then redo the function to try again
        console.log("Non-json'd version:", response);
        response = await response.json();
        console.log("JSON'd version:", response);

        const bestWaitTimeSeconds = handleRateLimit(response);
        console.log(`Waiting for ${bestWaitTimeSeconds + 5} seconds`)
        // Delay is in ms so convert from seconds to ms
            // Added a buffer period here to prevent any issues
        await delay(bestWaitTimeSeconds * 1000 + 5000);
        
        // Fetch the item again
        response = await fetch(steamApiUrl + itemName + `?api_key=${apikey}` + `&median_history_days=10000`);
    } else if (response.status != 429 && response.status != 200) {
        // If the response is not 200, throw an error, ending the program
        // ERROR came here, maybe just make it wait, since it's an api response issue, not something with the item
        // waiting fixed the issue for postman, I could call the api in the same day again
        // Run the program again and check for what status the response is and how to handle it
        console.log("This response is not 200 or 429");
        console.log("Non-json'd version:", response);
        response = await response.json();
        console.log("JSON'd version:", response);

        throw new Error("Failed to fetch data, automatically returning, not 200 or 429 error codes", response);
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

// Dealing with json'd version of the response
function handleRateLimit(response) {
    let current = Date.now();
    let seconds = Math.ceil(current / 1000);
    const dayExpires = Math.ceil(response.requests.day.expiresAt);
    const minuteExpires = Math.ceil(response.requests.minute.expiresAt);
    const dayRequests = Math.ceil(response.requests.day.hits);

    console.log("dayExpires Type:", typeof dayExpires);
    console.log("dayexpires:", dayExpires)
    console.log("minuteExpires Type:", typeof minuteExpires);
    console.log("minuteExpires:", minuteExpires);
    console.log("dayRequests Type:", typeof dayRequests);
    console.log("dayRequests:", dayRequests);

    // if day over the rate, wait until the day expires 
    if (dayRequests >= 5000) {
        return dayExpires - seconds;
    } 
    // if minute over the rate, wait until the minute expires
    else {
        return minuteExpires - seconds;
    } 
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
    const itemsStrings = Object.keys(data);

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
                console.log("Item prices are already the latest in collection:", item);
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
                console.log("Successfully grabbed new item:", item);
            } catch (error) {
                console.error(`Failed to grab new item: ${item}`, error);
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