import Image from "next/image";
import InterfaceGrid from "@/components/InterfaceGrid";
import { GlobalContextComponent } from "@/app/GlobalContext.js";

export default async function Home() {
    return (
      <GlobalContextComponent>
        <div className="bg-zinc-700">
            <div className="flex flex-col gap-5 px-10 py-10 w-full h-full">
              {/* <div className="flex h-fit flex-row justify-center items-center gap-7 bg-black">
                <Search />
                <Chart />
              </div> */}
              <InterfaceGrid />
              <p className="text-zinc-400">
                CSGO Prices Dashboard <br/>
                Thanks <a className="no-underline" href="https://www.tradingview.com/">TradingView</a><br/>
                (Made with 🐐 by jerryq0101)
              </p>
            </div>
            
      </div>
      </GlobalContextComponent>
        
    )
}
