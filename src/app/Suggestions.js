import React from "react";
import data from "../../misc/items_list.json" assert { type: 'json' };

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