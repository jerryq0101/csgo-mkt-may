import { Stat } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";

export default function PropertiesComponent() {
    const imageRef = useRef(null);
    // Things to do
    // 1. Figure out how to do react tables DONE
    // 2. Figure out how to format images 
    // image and table resizing
    // 3. Combine Context logic and local search for properties.


    return (
        <div className="px-[50px] text-zinc-600">
            <div className="flex flex-row">
                <img ref={imageRef} width={220} height={200}></img>
                <div className="flex flex-col gap-5 w-fit">

                    {/* Prices Table */}
                    <table className="w-fit table-auto border-2 border-zinc-600 rounded-md border-separate">
                        <thead>
                            <tr>
                                <th className="px-5 py-5 border-b-2 border-r-2 border-zinc-600">$_7d_avg</th>
                                <th className="px-5 py-5 border-b-2 border-r-2 border-zinc-600">$_30d_avg</th>
                                <th className="px-5 py-5 border-b-2 border-zinc-600">$_90d_avg</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-5 py-5 border-r-2 border-zinc-600">239.64</td>
                                <td className="px-5 py-5 border-r-2 border-zinc-600">239.64</td>
                                <td className="px-5 py-5">239.64</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Volume Table */}
                    <table className="w-fit table-auto border-2 border-zinc-600 rounded-md border-separate">
                        <thead>
                            <tr>
                                <th className="px-5 py-5 border-b-2 border-r-2 border-zinc-600">#_7d_avg</th>
                                <th className="px-5 py-5 border-b-2 border-r-2 border-zinc-600">#_30d_avg</th>
                                <th className="px-5 py-5 border-b-2 border-zinc-600">#_90d_avg</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-5 py-5 border-r-2 border-zinc-600">239.64</td>
                                <td className="px-5 py-5 border-r-2 border-zinc-600">239.64</td>
                                <td className="px-5 py-5">239.64</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* <UnstablePill />
            <StablePill />
            <NormalPill />
            <SpecialPill />
            <StattrakPill /> */}
        </div>
    )
}

// Price activity pills
function UnstablePill() {
    return (
        <div className="w-fit px-[15px] rounded-md py-[10px] border-2 border-sky-300 bg-sky-300/10 text-sky-300">
            Unstable
        </div>
    )
}

function StablePill() {
    return (
        <div className="w-fit px-[15px] rounded-md py-[10px] border-2 border-emerald-300 bg-emerald-300/10 text-emerald-300">
            Stable
        </div>
    )
}

// Grade pills
function NormalPill() {
    return (
        <div className="w-fit px-[15px] rounded-md py-[10px] border-2 border-zinc-400 bg-zinc-400/10 text-zinc-400">
            Normal
        </div>
    )
}

function SpecialPill() {
    return (
        <div className="w-fit px-[15px] rounded-md py-[10px] border-2 border-violet-500 bg-violet-500/10 text-violet-500">
            Special
        </div>
    )
}

function StattrakPill() {
    return (
        <div className="w-fit px-[15px] rounded-md py-[10px] border-2 border-orange-400 bg-orange-400/10 text-orange-400">
            StatTrak™
        </div>
    )
}
