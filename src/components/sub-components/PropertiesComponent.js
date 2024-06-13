"use client";

import React, { useRef, useEffect, useState, useContext } from "react";
import ImageCrop from "./ImageCropComponent";
import { GlobalContext } from '../../app/GlobalContext';
import { getProperties } from "../../app/Suggestions";

export default function PropertiesComponent() {
    const { query } = useContext(GlobalContext);
    const [tableData, setTableData] = useState([]);
    const [color, setColor] = useState("");
    const [imageURL, setImageURL] = useState("https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrumWJd7cFOhuDG_Zi73VDi-hdqNmn6INCXc1Q8NFDV_Qe-x7i8g5e-v8ydzSZi7HUr437UnAv3309ikmqnoA");
    const [unstable, setUnstable] = useState(false);

    useEffect(() => {
        if (query) {
            getProperties(query)
                .then(res => {
                    console.log("res thing", res)
                    // Set Table Data
                    const priceData = res.prices;
                    const priceRow = priceData.safe_ts;
                    const volumeRow = priceData.sold;
                    setTableData([[priceRow.last_7d, priceRow.last_30d, priceRow.last_90d],
                        [volumeRow.last_7d, volumeRow.last_30d, volumeRow.last_90d]]
                    )
                    
                    // Set Color
                    setColor(res.border_color);
                    
                    // Set Image
                    setImageURL(res.image);

                    // Set Unstable
                    setUnstable(priceData.unstable)
                })
        }
    }, [query])


    // // R
    // const imageURL = "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhoyszJemkV4N27q4KHgvLLPr7Vn35cppJ02uyUrI2h3wDkrkFsZz-gLdXHIA87MFjTqFm-wevvjcC0tZrPnXp9-n51Y5J6evE";

    // S
    // const imageURL = "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJB496klb-HnvD8J_XSkDkB68Ani-qQpNmkigC1-EM4azj7IIadc1NtZVvX-QLsl7-7gce4ot2XngYgmyTY";

    // // P
    // const imageURL = "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09-vloWZlOX7MITck29Y_cg_3r2QpY2n0QWx_BU4aj_6ctTAJgE4aF7W-FC4lLq7hZO1vMnLznFhvj5iuyjLh3IIBg";

    // // SMG
    // const imageURL = "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6rwOANf0v73cjRQ78m_gIKEluXwDLrAg2pu5Mx2gv2Pp9ygjQW1qEI-ZjuldtTDIw5oYVzU8wLtwea9gZTo7cvKnHYy7nR252GdwUKm_fIvZg";

    // // knife
    // const imageURL = "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrumWJd7cFOhuDG_Zi73VDi-hdqNmn6INCXc1Q8NFDV_Qe-x7i8g5e-v8ydzSZi7HUr437UnAv3309ikmqnoA";

    // // Gloves
    // const imageURL = "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibipJAhk2_zdfzl969C5goWYqPX4PLTVnmRE5sFOjfzE5578hFi1lB45NzC2eZiScAE5Zl3X-1jvl-_vgcPtvZvOyXNks3Jz4HaInkPlhhEaarQ-06bNVxzAUCgGAjh-"
    
    const croppedImage = <ImageCrop src={imageURL} width={220} height={150} />;

    
    // Different types of images
    // Rifles - w > h
    // Snipers - w >> h
    // pistols - more square
    // SMGs - more square
    // Knives - more square
    // Gloves - more square

    // Things to do
    // 1. Figure out how to do react tables DONE
    // 2. Figure out how to format images DONE
    // image and table resizing 
    // 3. Combine Context logic and local search for properties.

    return (
        <div className="px-[50px] py-14 text-zinc-600 flex h-full justify-center ">
            <div className="flex gap-5 flex-row w-fit">
                <div className="flex flex-col py-5 gap-3 w-fit">
                    {croppedImage} 
                    <div className="w-full flex justify-center gap-3">


                        {
                            color === "8650AC" ? <SpecialPill /> : <NormalPill />
                        }

                        {
                            unstable ? <UnstablePill /> : <StablePill />
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-fit">

                    {/* Prices Table */}
                    <table className="w-fit table-auto border-2 border-zinc-600 rounded-md border-separate">
                        <thead>
                            <tr>
                                <th className="px-3 py-3 border-b-2 border-r-2 border-zinc-600">$_7d_avg</th>
                                <th className="px-3 py-3 border-b-2 border-r-2 border-zinc-600">$_30d_avg</th>
                                <th className="px-3 py-3 border-b-2 border-zinc-600">$_90d_avg</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-3 py-3 border-r-2 border-zinc-600">{tableData.length != 0 ? tableData[0][0] : 239.64}</td>
                                <td className="px-3 py-3 border-r-2 border-zinc-600">{tableData.length != 0 ? tableData[0][1] : 239.64}</td>
                                <td className="px-3 py-3">{tableData.length != 0 ? tableData[0][2] : 239.64}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Volume Table */}
                    <table className="w-fit table-auto border-2 border-zinc-600 rounded-md border-separate">
                        <thead>
                            <tr>
                                <th className="px-3 py-3 border-b-2 border-r-2 border-zinc-600">#_7d</th>
                                <th className="px-3 py-3 border-b-2 border-r-2 border-zinc-600">#_30d</th>
                                <th className="px-3 py-3 border-b-2 border-zinc-600">#_90d</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-3 py-3 border-r-2 border-zinc-600">{tableData.length != 0 ? tableData[1][0] : 239.64}</td>
                                <td className="px-3 py-3 border-r-2 border-zinc-600">{tableData.length != 0 ? tableData[1][1] : 239.64}</td>
                                <td className="px-3 py-3">{tableData.length != 0 ? tableData[1][2] : 239.64}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// Price activity pills
function UnstablePill() {
    return (
        <div className="text-sm w-fit px-[15px] rounded-md py-[10px] border-2 border-sky-300 bg-sky-300/10 text-sky-300">
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
        <div className="text-sm w-fit px-3 rounded-md py-3 border-2 border-orange-400 bg-orange-400/10 text-orange-400">
            StatTrak™
        </div>
    )
}
