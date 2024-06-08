export const dynamic = 'force-dynamic'

import { type NextRequest } from 'next/server'
import MongoDbConnection from "../../lib/dbconnection";

export async function GET(request: NextRequest) {
    try {
        const client = await MongoDbConnection.getInstance();
        if (!client) {
            throw Error("Database connection failed")
        }

        const db = await client.getDb();
        if (!db) {
            throw Error("Database connection failed")
        }

        const collection = await db.collection('properties');
        if (!collection) {
            throw Error("Collection not found")
        }
        const searchParams = request.nextUrl.searchParams;
        const queryString = searchParams.get('query')
        const data = await collection.find({
            name: {
                $regex: new RegExp(queryString || '', 'i') // 'i' makes it case insensitive
            }
        }).toArray();

        console.log('data', data);
        
        return Response.json({
            isSuccessful: true,
            data
        })
    } catch (err) {
        console.error(err)
        return Response.json({
            isSuccessful: false,
            data: null
        })
    }
}