import Image from "next/image";
import Chart from "@/components/Chart.js";
import Search from "@/components/ActualSearch";
import { GlobalContextComponent } from "@/app/GlobalContext.js";

export default async function Home() {
    return (
      <div>
        <div className="flex justify-center items-center min-h-screen py-10 lg:px-10 md:px-5 sm:px-0 bg-zinc-700 sm:overflow-auto">
              <GlobalContextComponent>
                <div className="mt-10 flex flex-col gap-5">
                  <div className="flex h-fit xl:flex-row sm:flex-col sm:items-left gap-7">
                    <Search />
                    <Chart />
                  </div>
                  <p className="text-zinc-400">
                    I started this in HS, but gave up. <br/>
                    Here it is in 1st yr college. <br />
                    Thanks <a className="no-underline" href="https://www.tradingview.com/">TradingView</a>. <br />
                    (jerryq0101)
                  </p>
                </div>
              </GlobalContextComponent>
        </div>
      </div>
    )
}
