import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_CONNECTION_STRING;

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

async function getOne() {
    const { collection, client } = await setup();
    const query = {name: "★ Flip Knife | Ultraviolet (Field-Tested)"};
    const result = await collection.findOne(query);
    console.log(result);
}

getOne();