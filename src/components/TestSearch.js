"use client";

import { useEffect, useState, useRef, useContext } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Dots from './icons/dots';
import SearchIcon from "./icons/search";
import { GlobalContext } from '../app/GlobalContext';

export default function Search() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [searching, setSearching] = useState(false);
    const [tooShort, setTooShort] = useState(false);
    const { setQuery } = useContext(GlobalContext);

    const timeout = useRef();

    const [searchStyles, setSearchStyles] = useState("");

    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleExitFocus = () => {
        setIsFocused(false);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        if (!search) {
            setSearchStyles("rounded-xl");
        } else {
            setSearchStyles("rounded-t-xl rounded-b-none");
        }
    }, [search, isFocused])

    const processItem = (item) => {
        const destructuredItem = item.split("(");
        
            if (destructuredItem[0].length > 9) {
                destructuredItem[0] = destructuredItem[0].substring(0, 9) == "StatTrak™" ? "ST"+ destructuredItem[0].substring(9) : destructuredItem[0];
            }
            let name = destructuredItem[0].length > 20 ? destructuredItem[0].substring(0, 20) + "..." : destructuredItem[0];
            let wear;
    
            if (destructuredItem[1] === "Factory New)") {
                wear = "FN";
            } else if (destructuredItem[1] === "Minimal Wear)") {
                wear = "MW";
            } else if (destructuredItem[1] === "Field-Tested)") {
                wear = "FT";
            } else if (destructuredItem[1] === "Well-Worn)") {
                wear = "WW";
            } else if (destructuredItem[1] === "Battle-Scarred)") {
                wear = "BS";
            } else {
                return name;
            }
            return `${name} (${wear})`;
        
    }

    /*
        Alternatively, it can accept a ref to another component created with 
        React's useRef hook. This ref should be passed both to the draggable 
        component's dragConstraints prop, and the ref of the component you want
        to use as constraints.
    */

    return (
        <>
            <div>
                <div className="bg-neutral-200 xl:max-w-[389px] w-fit flex rounded-xl">
                    <div className="h-[395px] md:w-[389px] w-fit">
                        <div className="h-[55px] flex flex-row items-center">
                            <div className="px-[13px] py-[15px]">
                                <div className="cursor-pointer">
                                    {/* On drag here */}
                                    <Dots />
                                </div>
                            </div>
                        </div>

                        {/* Inner column of stuff */}
                        <div className="px-[50px]">
                            {/* Search Bar */}
                            <div className={`bg-white rounded-xl w-full px-[10px] py-[19px] mb-auto ${searchStyles} select-none text-black`}>
                                <TextField
                                    id="outlined-start-adornment"
                                    placeholder="Search for CS Item"
                                    sx={{ m: 0 }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>,
                                    }}
                                />
                            </div>

                            {
                                !tooShort && searching 
                                    && 
                                    <div className="bg-white rounded-b-xl w-full px-[27px] py-[19px] text-black select-none">
                                        Searching...
                                    </div>
                            }

                            {
                                search && suggestions.length == 0 && !searching && tooShort 
                                    && 
                                    <div className="bg-white rounded-b-xl w-full px-[27px] py-[19px] text-black select-none">
                                        Too short bro
                                    </div>
                            }
                            {
                                search && suggestions.length == 0 && !searching && !tooShort 
                                    && 
                                    <div className="bg-white rounded-b-xl w-full px-[27px] py-[19px] text-black select-none">
                                        No results found (Be more specific)
                                    </div>
                            }

                            {
                                search && suggestions.length != 0 && !searching && 
                                    <div className="w-full overflow-auto max-h-[217px] rounded-b-xl overscroll-none">
                                    {
                                        suggestions.map((item, index) => {
                                            // Process the name such that its shorter
                                            const finalString = processItem(item);
                                            return (
                                                <div key={index} className="bg-white px-[8px] py-[3px] select-none">
                                                        <button 
                                                            key={index} 
                                                            autoFocus={index === 0}
                                                            className={`bg-white flex items-start w-full px-[19px] py-[16px] text-gray-700 hover:bg-gray-300 focus:bg-blue-300 focus:text-black rounded-md cursor-default outline-none`}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'ArrowDown') {
                                                                    event.preventDefault();
                                                                    const nextElement = event.target.parentNode.nextElementSibling;
                                                                    nextElement && nextElement.firstChild.focus();
                                                                } else if (event.key === 'ArrowUp') {
                                                                    event.preventDefault();
                                                                    const previousElement = event.target.parentNode.previousElementSibling;
                                                                    previousElement && previousElement.firstChild.focus();
                                                                }
                                                            }}
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                // console.log("Clicked on: ", finalString)
                                                                setQuery(item);
                                                            }}
                                                        >
                                                            {finalString}
                                                        </button>
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