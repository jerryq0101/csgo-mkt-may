import Image from "next/image";
import Chart from "@/components/Chart.js";
import Search from "@/components/TestStuff.js";
import { GlobalContextComponent } from "@/app/GlobalContext.js";

export default async function Home() {
    return (
      <div className="flex justify-center items-center min-h-screen py-5 lg:px-10 md:px-5 sm:px-0 bg-zinc-700 sm:overflow-auto">
            <GlobalContextComponent>
              <div className="flex h-fit xl:flex-row sm:flex-col sm:items-left gap-7">
                <Search />
                <Chart />
              </div>
            </GlobalContextComponent>
      </div>
    )
}
