import Image from "next/image";
import Chart from "@/components/Chart.js";
import Search from "@/components/Search.js";
import { GlobalContextComponent } from "@/app/GlobalContext.js";

export default async function Home() {

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
