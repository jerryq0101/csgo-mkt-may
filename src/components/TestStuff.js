"use client";

import { useEffect, useState, useRef } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Dots from './icons/dots';
import SearchIcon from "./icons/search";
import { motion, useDragControls } from 'framer-motion';

export default function TestStuff() {
    const reference = useRef(null);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [searching, setSearching] = useState(false);
    const [tooShort, setTooShort] = useState(false);
    
    useEffect(() => {
        if (search.length >= 3) {
            setTooShort(false);
            setSearching(true);
            fetch(`/api/suggestions/?query=${search}`)
            .then(res => res.json())
            .then(data => {
                const dataArray = data.data
                console.log(dataArray)
                const namesArray = dataArray.map(item => item.name)
                console.log(namesArray)
                setSearching(false);
                setSuggestions(namesArray)
            })
            
        } else {
            setSuggestions([]);
            setTooShort(true);
        }
    }, [search])

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

    const controls = useDragControls()

    function startDrag(event) {
        controls.start(event)
        console.log("Started")
    }
      
    /*
        Alternatively, it can accept a ref to another component created with 
        React's useRef hook. This ref should be passed both to the draggable 
        component's dragConstraints prop, and the ref of the component you want
        to use as constraints.
    */

    return (
        <>
            <motion.div ref={reference} className="bg-zinc-700 w-[900px] h-[900px]" />
            {/* <div className="drag-area bg-zinc-700 w-full h-[500px] flex flex-row justify-center"> */}
                    <motion.div
                        drag
                        dragConstraints={reference}
                        dragListener={false}
                        dragControls={controls}
                        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                    >
                        <div className="bg-neutral-200 w-fit flex rounded-xl">
                            <div className="h-[395px] w-[389px]">
                                <div className="h-[55px] flex flex-row items-center">
                                    <div className="px-[13px] py-[15px]">
                                        <div className="cursor-pointer" onPointerDown={startDrag}>
                                            {/* On drag here */}
                                            <Dots />
                                        </div>
                                    </div>
                                </div>

                                {/* Inner column of shit */}
                                <div className="px-[50px]">
                                    {/* Search Bar */}
                                    <div className={`bg-white rounded-xl w-full px-[10px] py-[19px] mb-auto ${searchStyles} select-none text-black`}>
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

                                    {
                                        !tooShort && searching 
                                            && 
                                            <div className="bg-white rounded-b-xl w-full px-[27px] py-[19px] text-black">
                                                Searching...
                                            </div>    
                                    }

                                    {
                                        search && suggestions.length == 0 && !searching && tooShort 
                                            && 
                                            <div className="bg-white rounded-b-xl w-full px-[27px] py-[19px] text-black">
                                                Too fuckin short 🖕
                                            </div>
                                    }
                                    {
                                        isFocused && search && suggestions.length == 0 && !searching && !tooShort 
                                            && 
                                            <div className="bg-white rounded-b-xl w-full px-[27px] py-[19px] text-black">
                                                No results found
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
                                                        <div className="bg-white px-[8px] py-[3px] select-none">
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
                                                                        console.log("Clicked on: ", finalString)
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
                    </motion.div>

                    <motion.div
                        drag
                        dragConstraints={reference}
                    >
                        <div className="bg-neutral-200 w-fit flex rounded-xl">
                            <div className="h-[395px] w-[389px]">
                            </div>
                        </div>
                    </motion.div>
            {/* </div> */}
        </>
    );
}