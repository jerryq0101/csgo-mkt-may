import Image from "next/image";
import Chart from "@/components/Chart.js";
import Search from "@/components/Search.js";
import TestStuff from "@/components/TestStuff.js";
import { GlobalContextComponent } from "@/app/GlobalContext.js";

export default async function Home() {
    return (
      <div className="flex justify-center py-10">
        <div className="w-10/12">
          <main className="w-full flex flex-col gap-10 min-h-screen items-center justify-center">
            <GlobalContextComponent>
              <Search />
              <Chart />
            </GlobalContextComponent>
            <TestStuff />
          </main>
        </div>
      </div>
    )
}
