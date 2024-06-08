import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default class MongoDbConnection {
    private static instance: MongoDbConnection;
    private dbClient: MongoClient | null = null;
    private db: Db | null = null;

    private constructor() {}

    public static async getInstance(): Promise<MongoDbConnection> {
        if (!MongoDbConnection.instance) {
            MongoDbConnection.instance = new MongoDbConnection();
            await MongoDbConnection.instance.connect();
        }
        return MongoDbConnection.instance;
    }

    private async connect() {
        const uri = process.env.MONGO_CONNECTION_STRING;
        if (!uri) {
            throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
        }
        this.dbClient = new MongoClient(uri);
        await this.dbClient.connect();
        this.db = this.dbClient.db("items-data");
        console.log("Connected to MongoDB");
    }
    
    public getDb(): Db | null {
        return this.db;
    }
}