import React from "react";
import data from "../../misc/items_list.json" assert { type: 'json' };
import propertiesData from "../../misc/items_list_properties.json" assert { type: "json" };

// For suggestions
export function getSuggestions(query) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = search(query);
            resolve(result);
        })
    })
}

// Search through the data for a match of the search
function search(query) {
    const itemNames = Object.keys(data);
    return itemNames.filter((thing) => {
        return thing.toLowerCase().includes(query.toLowerCase());
    });
}

// For properties search
export function getProperties(query) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = searchProperties(query);
            resolve(result);
        })
    })
}

function searchProperties(query) {
    const itemsArray = propertiesData.data;
    
    for (let item of itemsArray) {
        const {
            border_color,
            image,
            prices
        } = item
        if (item.market_name === query) {
            return {
                    border_color,
                    image,
                    prices
            }
        }
    }
    return null;
}