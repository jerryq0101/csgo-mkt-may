import Image from "next/image";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Chart from "@/components/Chart.js";
import Search from "@/components/Search.js";
import { GlobalContextComponent } from "@/app/GlobalContext.js";
import clientPromise from "./lib/mongodb";

type ConnectionStatus = {
  isConnected: boolean;
  collection: any;
}

async function getData(): Promise<ConnectionStatus> {
  try {
    const client = await clientPromise;
    const db = await client.db('items-data');
    const collection = await db.collection('properties');
    
    return {
        isConnected: true,
        collection 
    };
  } catch (err) {
    console.error(err);
    return {
        isConnected: false,
        collection: null 
    }
  }
}


export default async function Home() {
  const { isConnected, collection } = await getData();
    
  if (!isConnected || !collection) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl text-center">You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.</h1>
      </main>
    )
  } else {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-4xl text-center">You are connected to MongoDB! LFG</h1>
        <GlobalContextComponent>
          <Search />
          <Chart />
        </GlobalContextComponent>
      </main>
    )
  }
}
