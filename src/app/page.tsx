import Image from "next/image";
import InterfaceGrid from "@/components/InterfaceGrid";
import { GlobalContextComponent } from "@/app/GlobalContext.js";

export default async function Home() {
    return (
      <div className="bg-zinc-700 h-fit">
        <div className="flex justify-center h-fit items-center px-6 py-10 ">
              <GlobalContextComponent>
                <div className="flex flex-col gap-5 w-full h-full">
                  {/* <div className="flex h-fit flex-row justify-center items-center gap-7 bg-black">
                    <Search />
                    <Chart />
                  </div> */}
                  <InterfaceGrid />
                  <p className="text-zinc-400">
                    CSGO-Prices Dashboard <br/>
                    Thanks <a className="no-underline" href="https://www.tradingview.com/">TradingView</a><br/>
                    (jerryq0101)
                  </p>
                </div>
              </GlobalContextComponent>
        </div>
      </div>
    )
}
