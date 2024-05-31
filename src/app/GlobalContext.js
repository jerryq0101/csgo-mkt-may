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
                value: item.median_price
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
                        const processedData = getArrayFromResponseJson(data);
                        setData(processedData);
                    }
                })
        } else {
            setData([
                { time: '2018-12-22', value: 32.51 },
                { time: '2018-12-23', value: 31.11 },
                { time: '2018-12-24', value: 27.02 },
                { time: '2018-12-25', value: 27.32 },
                { time: '2018-12-26', value: 25.17 },
                { time: '2018-12-27', value: 28.89 },
                { time: '2018-12-28', value: 25.46 },
                { time: '2018-12-29', value: 23.92 },
                { time: '2018-12-30', value: 22.68 },
                { time: '2018-12-31', value: 22.67 },
            ]);
        }
    }, [query]);

    return (
        <GlobalContext.Provider value={{ data, loading, query, setQuery }}>
            {children}
        </GlobalContext.Provider>
    );
}