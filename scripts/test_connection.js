import dotenv from "dotenv";
dotenv.config();
import data from "../misc/items_list.json" assert { type: 'json' };
import { MongoClient, ServerApiVersion } from "mongodb"
const uri = process.env.MONGO_CONNECTION_STRING

// Connect operation to MongoDB, should return a necessary object of needed elements
async function setup() {

    // Mongo Client object
    const client = new MongoClient(uri);

    await client.connect();

    const dbName = "sample_mflix"
    const collectionName = "comments"

    // Create references to the database and collection in order to run
    // operations on them.
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    try {
        await collection.insertOne(
            {
                name: "elotes",
                ingredients: [
                  "corn",
                  "mayonnaise",
                  "cotija cheese",
                  "sour cream",
                  "lime",
                ],
                prepTimeInMinutes: 35,
            }
        );
        console.log("Sample data successfuly inserted into the collection");
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }

    return {
        collection,
        client
    };
}

  async function query(itemName) {
    // Your implementation here...
    
  }
  
  // Create a delay function
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  let minuteRequests = 0;
  let dailyRequests = 0;
  
  // This function should only be called once
  async function fetchData() {
    const itemsWithProperties = data.data;
    const itemsStrings = itemsWithProperties.map(item => item.market_hash_name);

    async function writeMongoDB(data) {
        // Your implementation here...
        
    }

    
    // Setup Mongo
    const {collection, client} = await setup();



    // // Loop through each existing csgo item
    // for (const item of itemsStrings) {
    //   if (minuteRequests >= 100) {
    //     // If we've hit the rate limit for the minute, wait until the next minute
    //     await delay(60000);
    //     minuteRequests = 0;
    //   }
    
    //   if (dailyRequests >= 5000) {
    //     // If we've hit the rate limit for the day, wait until the next day
    //     await delay(86400000);
    //     dailyRequests = 0;
    //   }
    
    //   // Within minute and daily limits, fetch data for the item and store it.
    //   try {
    //     const res = await query(item);
    //     const data = await res.json();
    
    //       await writeMongoDB(data);
    //       minuteRequests++;
    //       dailyRequests++;
        
    //     } catch (error) {
    //         console.error(`Failed to fetch data for item: ${item}`, error);
    //     }
    // }
    
    
    // Not sure why client.close() is not working inside of another function
    // Sol'n: Because the linear execution process of non await lines,
    // when calling collection.insertOne(), the operation is a process that isn't finished yet
    // thus causing the client.close() to be called before the insertOne() operation is finished
    // so make sure to await any operation that is dealing with external resources.
    await client.close()
  }

  fetchData();