"use client";
import { useEffect, useState, useRef } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Dots from './icons/dots';
import SearchIcon from "./icons/search";

export default function TestStuff() {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [querying, setQuerying] = useState(false);

    const [searchStyles, setSearchStyles] = useState("");

    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleExitFocus = () => {
        setIsFocused(false);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setItems([]);
        console.log("e.target.value: ", e.target.value);
        
        if (e.target.value != "") {
            setQuerying(true);
            // Random number generator to query success or fail
            let random = getRandomInt(10);
            if (random >= 5){
                // Simulate querying (Successful)
                timeoutId = setTimeout(() => {
                    setItems(["Item 1", "Item 2", "Item 3"]);
                    setQuerying(false);
                }, 3000);
            } else {
                // Simulate querying (No items found)
                timeoutId = setTimeout(() => {
                    setItems([]);
                    setQuerying(false);
                }, 3000);
            }
        }
    }


    useEffect(() => {
        console.log("Focused: ", isFocused)
        
        // Rules
        // Always keep search up to the user

        // if focused
        // searching (search not empty) => display searching
        // searching (search not empty) && items != 0 => display items
        // searching (search not empty) && search != '' && items == 0 => display failed

        // if not focused
        // keep search text there

        // Searching State:
        // - Search bar is not rounded at the bottom
        // - Display searching status as an item

        // Items State:
        // - Search bar is rounded bottom
        // - Display items

        // Failed State:
        // - Search bar is rounded bottom
        // - Display failed message

    }, [isFocused])


    useEffect(() => {
        console.log("Search: ", search)
        console.log("Items: ", items)
        console.log("Querying: ", querying)

        if (isFocused) {
            // Searching State (Prioritize, since querying = true means we are searching,
                // querying = false doesn't mean the other two states are automatically true) 
            
            
            // Initial State
            if (search != "" && items.length == 0 && querying) {
                setSearchStyles("rounded-t-xl rounded-b-none")

                console.log()

                // Failed State (search not empty, items == 0, querying = false)
                if (!querying) {
                    
                }
            }
            // Items State
            else if (search != 0 && items.length != 0) {
                setSearchStyles("rounded-t-xl rounded-b-none")
            } else {
                setSearchStyles("rounded-xl")
            }
        } else {
            // Not Focused State
            setSearchStyles("rounded-xl")
        }
    }, [search, isFocused])

    

    
    return (
        <>
            <div className="bg-zinc-700 w-full flex flex-row justify-center">
                <div className="bg-neutral-200 w-fit rounded-xl">
                    <div className="h-[395px] w-[389px]">
                        <div className="h-[55px] flex flex-row items-center">
                            <div className="px-[13px] py-[15px]">
                                <div>
                                    {/* On drag here */}
                                    <Dots />
                                </div>
                            </div>
                        </div>

                        {/* Inner column of shit */}
                        <div className="px-[50px]">
                            {/* Search Bar */}
                            <div className={`bg-white rounded-xl w-full px-[10px] py-[19px] mb-auto ${searchStyles}`}>
                                <TextField
                                    ref={inputRef}
                                    value={search}
                                    onChange={handleSearchChange}
                                    onFocus={handleFocus}
                                    onBlur={handleExitFocus}
                                    id="outlined-start-adornment"
                                    placeholder="Search for an Item"
                                    sx={{ m: 0 }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>,
                                    }}
                                />
                            </div>

                            {/* Searching status */}
                            {
                                isFocused && search && items.length == 0 && (
                                    querying ?
                                    <div className="bg-white rounded-b-xl w-full px-[10px] py-[19px] text-black">
                                        Searching...
                                    </div>
                                    :
                                    <div className="bg-white rounded-b-xl w-full px-[10px] py-[19px] text-black">
                                        Failed
                                    </div>
                                )
                            }

                            {
                                isFocused && search && items.length != 0 && !querying && 
                                <div className="bg-white rounded-b-xl w-full px-[10px] py-[19px] text-black">
                                    {
                                        items.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                            }
    
                                

                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}