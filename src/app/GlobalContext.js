"use client";

import React, { useContext, useEffect, useState } from "react";
export const GlobalContext = React.createContext();

export function GlobalContextComponent({ children }) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);

    function getArrayFromResponseJson(rawData) {
        console.log(rawData.data.price_history)
        const array = rawData.data.price_history;
        
        // Filter out the volume data for now
        const filteredArray = array.map(item => {
            // To deal with single digit months not working for tradingview
            const year = item.date.split("-")[0];
            let month = item.date.split("-")[1];
            let day = item.date.split("-")[2];
            
            if (month.length == 1) {
                month = "0" + month;
            } 
            if (day.length == 1) {
                day = "0" + day;
            }
            return {
                time: `${year}-${month}-${day}`,
                price: item.median_price,
                volume: item.volume
            }
        })

        return filteredArray;
    }

    useEffect(() => {
        // Fetch some bullshit data from api, set loading is true, 
        // and set data, then set loading to be false
        if (query) {
            setLoading(true);
            console.log("Query Item Text from Global Context: ", query)
            const name = encodeURIComponent(query);
            
            fetch(`/api?name=${name}`)
                .then(res => res.json())
                .then(data => {
                    if (data.data) {
                        console.log(data)

                        // Change getArrayFromResponseJson to also include volume in the returned data
                        // So context data will need to be processed to separate price and volume in Chart.js
                        const processedData = getArrayFromResponseJson(data);
                        setData(processedData);
                    }
                })
        } else {
            setData([
                { time: '2018-12-22', price: 32.51, volume: 100 },
                { time: '2018-12-23', price: 31.11, volume: 150 },
                { time: '2018-12-24', price: 27.02, volume: 200 },
                { time: '2018-12-25', price: 27.32, volume: 120 },
                { time: '2018-12-26', price: 25.17, volume: 80 },
                { time: '2018-12-27', price: 28.89, volume: 90 },
                { time: '2018-12-28', price: 25.46, volume: 110 },
                { time: '2018-12-29', price: 23.92, volume: 70 },
                { time: '2018-12-30', price: 22.68, volume: 60 },
                { time: '2018-12-31', price: 22.67, volume: 50 },
            ]);
        }
    }, [query]);

    return (
        <GlobalContext.Provider value={{ data, loading, query, setQuery }}>
            {children}
        </GlobalContext.Provider>
    );
}