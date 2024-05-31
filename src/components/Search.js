"use client";

import React, { useState, useContext } from "react"
import { GlobalContext } from "../app/GlobalContext"
import TextField from '@mui/material/TextField';

export default function Search() {
    const [search, setSearch] = useState("");
    const { setQuery } = useContext(GlobalContext);
    
    const handleSearchChange = (event) => {
        const newSearchValue = event.target.value;
        setSearch(newSearchValue);
        setQuery(newSearchValue);
        console.log("Search Text from Search Component: ", newSearchValue)
    }

    return (
        <div>
            <input 
                value={search}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleSearchChange} 
            >
            </input>
        </div>
    )
}