"use client";

import React, { useState, useContext, useEffect } from "react"
import { GlobalContext } from "../app/GlobalContext"
import TextField from '@mui/material/TextField';

export default function Search() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [searching, setSearching] = useState(false);
    const { query, setQuery } = useContext(GlobalContext);
    
    useEffect(() => {
        if (search.length >= 3) {
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
        }
    }, [search])

    const handleSearchChange = (event) => {
        const newSearchValue = event.target.value;
        setSearch(newSearchValue);
        console.log("Search Text from Search Component: ", newSearchValue)
    }

    return (
        <div className="w-full py-2">
            <TextField 
                id="outlined-basic"
                variant="outlined"
                value={search}
                className="shadow px-3 py-3 border rounded bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleSearchChange} 
            />

            {
                searching && <div className="bg-white w-full overflow-auto max-h-64">
                <div className="p-2 text-black">
                    Loading...
                </div>
                </div>
            }

            {
                suggestions == 0 && search.length > 0 && !searching && <div className="bg-white w-full overflow-auto max-h-64">
                <div className="p-2 text-red-400">
                    No results found
                    </div>
                    </div>
            }
            
            {(suggestions.length > 0 && search.length > 0) &&
                <div className="bg-white w-full overflow-auto max-h-64">
                    {suggestions.map((item, index) => (
                        <div key={index} className="p-2 hover:bg-gray-200 text-black" 
                            onClick={() => {
                                setQuery(item)
                                setSearch(item)
                            }}>
                            {item}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}