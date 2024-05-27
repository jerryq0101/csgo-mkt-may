import dotenv from "dotenv";
dotenv.config();
import data from "../misc/items_list.json" assert { type: 'json' };
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_CONNECTION_STRING;
const apikey = process.env.STEAM_API_KEY;
const steamApiUrl = "https://api.steamapis.com/market/item/730/"

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

    return {
        collection,
        client
    };
}

// Write data to MongoDB
async function writeMongoDB(data, collection, client) {
    // Insert one specific item to the collection
    await collection.insertOne(data)
    console.log(`Successfully inserted ${data} into the collection`)
}

function convertEnglishToDate(englishDate) {
    const dateArr = englishDate.split(" ");

    if (dateArr.length != 3) {
        return "ERROR, date is not in the correct format";
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

  async function queryPrice(itemName) {
    // Your implementation here...
    // GET Request to SteamAPI
    const response = await fetch(steamApiUrl + itemName + `?api_key=${apikey}` + `&median_history_days=10000`);

    if (response.status == 429) {
        console.log(response)
        return 429;
    }

    const responseJson = await response.json();

    let itemPriceHistoryObjFormArr = []
    // Reformat the array to be more readable
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
  
async function existsInCollection(itemName, collection) {
    const query = { name: itemName };
    const result = await collection.findOne(query);
    return result !== null;
}
  
  
  // A delay function (for api limits)
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  let minuteRequests = 0;
  let dailyRequests = 0;
  
  // This function should only be called once
  async function fetchData() {
    const itemsWithProperties = data.data;
    const itemsStrings = itemsWithProperties.map(item => item.market_hash_name);

    // Setup Mongo
    const {collection, client} = await setup();

    // // Test process 
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
        // Check if the item has already been added to the collection
        if (await existsInCollection(item, collection)) {
            console.log("Item already exists in collection:", item);
            continue;
        }
        console.log("Processing item:", item)
      if (minuteRequests >= 100) {
        // If we've hit the rate limit for the minute, wait until the next minute
        await delay(60000);
        minuteRequests = 0;
      }
    
      if (dailyRequests >= 5000) {
        // If we've hit the rate limit for the day, wait until the next day
        await delay(86400000);
        dailyRequests = 0;
      }
    
      // Within minute and daily limits, fetch data for the item and store it.
      try {
        const data = await queryPrice(item);

        if (data == 429) {
            // If we've hit the rate limit for the day, wait until the next day
            console.log("Failed to fetch data for item:", item)
            await delay(86400000);
            dailyRequests = 0;
        }

        await writeMongoDB({
            name: item,
            price_history: data
        }, collection, client);
        minuteRequests++;
        dailyRequests++;
        console.log("Successfully fetched data for item:", item)
        
        } catch (error) {
            console.error(`Failed to fetch data for item: ${item}`, error);
        }
    }
    
    
    // Why running the program was returning an client closed error:
    // Sol'n: Because the linear execution process of non await lines,
    // when calling collection.insertOne(), the operation is a process that isn't finished yet
    // thus causing the client.close() to be called before the insertOne() operation is finished
    // so make sure to await any operation that is dealing with external resources.
    await client.close()
  }

  fetchData();