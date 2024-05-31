import clientPromise from "../lib/mongodb"
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = await client.db('items-data');
        const collection = await db.collection('properties');

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