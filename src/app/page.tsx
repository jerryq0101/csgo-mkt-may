import Image from "next/image";
import Chart from "@/components/Chart.js";
import Search from "@/components/ActualSearch";
import TestStuff from "@/components/TestStuff";
import { GlobalContextComponent } from "@/app/GlobalContext.js";

export default async function Home() {
    return (
      <div>
        <div className="flex justify-center items-center px-6 py-10 bg-zinc-700">

              <GlobalContextComponent>
                <div className="flex flex-col gap-5 w-full bg-blue-300">
                  <div className="flex h-fit flex-row justify-center items-center gap-7 bg-black">
                    <Search />
                    <Chart />
                    
                  </div>
                  <p className="text-zinc-400">
                    CSGO is cool. <br/>
                    Thanks <a className="no-underline" href="https://www.tradingview.com/">TradingView</a>.<br/>
                    (jerryq0101)
                  </p>
                  <TestStuff />
                </div>
              </GlobalContextComponent>
              
        </div>
      </div>
    )
}
