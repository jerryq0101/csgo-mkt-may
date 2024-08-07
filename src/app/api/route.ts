export const dynamic = 'force-dynamic'

import { type NextRequest } from 'next/server'
import MongoDbConnection from "../lib/dbconnection";

export async function GET(request: NextRequest) {
    try {
        const client = await MongoDbConnection.getInstance();
        const db = await client.getDb();

        if (!db) {
            throw Error("Database connection failed")
        }

        const collection = await db.collection('properties');

        if (!collection) {
            throw Error("Collection not found")
        }

        const searchParams = request.nextUrl.searchParams;
        const data = await collection.findOne({
            name: searchParams.get('name')
        })
        
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