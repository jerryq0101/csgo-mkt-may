"use client";

import React, { useState, useContext } from "react"
import { GlobalContext } from "../app/GlobalContext"
import TextField from '@mui/material/TextField';

export default function Search() {
    const [search, setSearch] = useState("");
    const { query, setQuery } = useContext(GlobalContext);
    
    function handleSearchChange(e) {
        setSearch(e.target.value);
        setQuery(search)
        console.log(query)
    }

    return (
        <div>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleSearchChange} 
            value={search}
            >
            </input>
        </div>
    )
}