"use client";

import React, { useEffect, useState, useRef } from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import TestSearch from "./TestSearch";
import Dots from "./icons/dots";
import SearchIcon from "./icons/search";
import DragComponent from "./sub-components/DragComponent";
import SearchComponent from "./sub-components/SearchComponent";
import ChartComponent from "./sub-components/ChartComponent";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function TestStuff() {
    const [layouts, setLayouts] = useState({});
    const [search, setSearch] = useState("");

    // FOR SEARCH COMPONENT! NOT FOR GRID
    const [isFocused, setIsFocused] = useState(false);
    const [searchStyles, setSearchStyles] = useState("");
    // BACK

    // If localStorage exists, get it, if not, set it to default object
    // (Called Second)
    useEffect(() => {
        console.log("first useeffect called")
        const layout = JSON.parse(localStorage.getItem("layout"));
        if (layout) {
            setLayouts(layout);
        } else {
            setLayouts(defaultLayout);
        }
    }, [])

    // (Called Third, 1st render)
    // Not called if layout did not change
    useEffect(() => {
        console.log("Second useeffect called")
        if (Object.keys(layouts).length > 0) {
            localStorage.setItem("layout", JSON.stringify(layouts));
        }
    }, [layouts])

    // Update Layout for state and localStorage 
    // (Called First, component mounting)
    const updateL = (layout, layouts) => {
        console.log("UpdateL called");
        setLayouts(layouts);
    }

    // FOR SEARCH COMPONENT! NOT FOR GRID
    useEffect(() => {
        if (!search) {
            setSearchStyles("rounded-xl");
        } else {
            setSearchStyles("rounded-t-xl rounded-b-none");
        }
    }, [search, isFocused])

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleExitFocus = () => {
        setIsFocused(false);
    }

    /*
    Documentation for any grid Item
    {
        // A string corresponding to the component key
        i: string,

        // These are all in grid units, not pixels
        x: number,
        y: number,
        w: number,
        h: number,
        minW: ?number = 0,
        maxW: ?number = Infinity,
        minH: ?number = 0,
        maxH: ?number = Infinity,

        // If true, equal to `isDraggable: false, isResizable: false`.
        static: ?boolean = false,
        // If false, will not be draggable. Overrides `static`.
        isDraggable: ?boolean = true,
        // If false, will not be resizable. Overrides `static`.
        isResizable: ?boolean = true,
        // By default, a handle is only shown on the bottom-right (southeast) corner.
        // As of RGL >= 1.4.0, resizing on any corner works just fine!
        resizeHandles?: ?Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'> = ['se']
        // If true and draggable, item will be moved only within grid.
        isBounded: ?boolean = false
        }
    */
    
    // // Search = 1 col version
    // const defaultLayout = {
    //     "xxl": [
    //         { i: "1", w: 1, h: 3, x: 0, y: 0, minW: 1, minH: 3 },
    //         { i: "2", w: 2, h: 3, x: 3, y: 0, minW: 2, minH: 3 },
    //         { i: "3", w: 1, h: 3, x: 5, y: 0, minW: 1, minH: 3 },
    //     ],
    //     "xl": [
    //         { i: "1", w: 1, h: 3, x: 0, y: 0, minW: 1, minH: 3 },
    //         { i: "2", w: 1, h: 3, x: 3, y: 0, minW: 1, minH: 3 },
    //         { i: "3", w: 1, h: 3, x: 5, y: 0, minW: 1, minH: 3 },
    //     ],
    //     "lg": [
    //         { i: "1", w: 1, h: 3, x: 0, y: 0, minW: 1, minH: 3 },
    //         { i: "2", w: 1, h: 3, x: 3, y: 0, minW: 1, minH: 3 },
    //         { i: "3", w: 2, h: 3, x: 5, y: 0, minW: 2, minH: 3 },
    //     ],
    //     "md": [
    //         { i: "1", w: 1, h: 3, x: 0, y: 0, minW: 1, minH: 2 },
    //         { i: "2", w: 1, h: 3, x: 3, y: 0, minW: 2, minH: 2 },
    //         { i: "3", w: 2, h: 3, x: 5, y: 0, minW: 2, minH: 2 },
    //     ],
    //     "sm": [
    //         { i: "1", w: 1, h: 3, x: 0, y: 0, minW: 1, minH: 2 },
    //         { i: "2", w: 1, h: 3, x: 3, y: 0, minW: 1, minH: 2 },
    //         { i: "3", w: 1, h: 2, x: 5, y: 0, minW: 1, minH: 2 },
    //     ],
    // }

    // // Search = 2 col version
    const defaultLayout = {
        "xxl": [
            { i: "1", w: 2, h: 1, x: 0, y: 0, minW: 2, minH: 1 },
            { i: "2", w: 4, h: 1, x: 3, y: 0, minW: 3, minH: 1 },
            { i: "3", w: 1, h: 1, x: 5, y: 0, minW: 1, minH: 1 },
        ],
        "xl": [
            { i: "1", w: 2, h: 1, x: 0, y: 0, minW: 2, minH: 1 },
            { i: "2", w: 3, h: 1, x: 3, y: 0, minW: 3, minH: 1 },
            { i: "3", w: 1, h: 1, x: 5, y: 0, minW: 1, minH: 1 },
        ],
        "lg": [
            { i: "1", w: 2, h: 1, x: 0, y: 0, minW: 2, minH: 1 },
            { i: "2", w: 3, h: 1, x: 3, y: 0, minW: 3, minH: 1 },
            { i: "3", w: 2, h: 1, x: 5, y: 0, minW: 2, minH: 1 },
        ],
        "md": [
            { i: "1", w: 2, h: 1, x: 0, y: 0, minW: 2, minH: 1 },
            { i: "2", w: 2, h: 1, x: 3, y: 0, minW: 2, minH: 1 },
            { i: "3", w: 2, h: 1, x: 5, y: 0, minW: 2, minH: 1 },
        ],
        "sm": [
            { i: "1", w: 2, h: 1, x: 0, y: 0, minW: 2, minH: 1 },
            { i: "2", w: 2, h: 1, x: 3, y: 0, minW: 2, minH: 1 },
            { i: "3", w: 1, h: 1, x: 5, y: 0, minW: 1, minH: 1 },
        ],
    }

    return (
        <>
        {/* // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
            // Breakpoint names are arbitrary but must match in the cols and layouts objects.
            breakpoints: ?Object = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},

            // # of cols. This is a breakpoint -> cols map, e.g. {lg: 12, md: 10, ...}
            cols: ?Object = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},


            // margin (in pixels). Can be specified either as horizontal and vertical margin, e.g. `[10, 10]` or as a breakpoint -> margin map, e.g. `{lg: [10, 10], md: [10, 10], ...}.
            margin: [number, number] | {[breakpoint: $Keys<breakpoints>]: [number, number]},


            // containerPadding (in pixels). Can be specified either as horizontal and vertical padding, e.g. `[10, 10]` or as a breakpoint -> containerPadding map, e.g. `{lg: [10, 10], md: [10, 10], ...}.
            containerPadding: [number, number] | {[breakpoint: $Keys<breakpoints>]: [number, number]},


            // layouts is an object mapping breakpoints to layouts.
            // e.g. {lg: Layout, md: Layout, ...}
            layouts: {[key: $Keys<breakpoints>]: Layout},
        */}

            <ResponsiveGridLayout
                className="layout bg-red-300 select-none"
                breakpoints={{xxl: 1536, xl: 1280, lg: 1024, md: 768, sm: 480}}
                // // search = 1 col Version
                // cols={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1 }}
                // search = 2 col version
                cols={{ xxl: 7, xl: 6, lg: 5, md: 2, sm: 2 }}
                rowHeight={500}
                margin={[10, 10]}
                containerPadding={[15, 15]}
                layouts={layouts}
                onLayoutChange={updateL}
                draggableHandle=".draggable-handle"
            >
                <div className="bg-neutral-200 flex flex-col rounded-xl" key="1" >
                    
                    {/* Dots top section */}
                    <DragComponent />

                    {/* Search bar ITSELF */}
                    <SearchComponent />
                    
                    <span className="text">1</span>
                </div>

                <div className="bg-neutral-200 flex flex-col rounded-xl"key="2" >
                    <DragComponent />
                    <div className="pt-5">
                        <ChartComponent />
                    </div>
                    <span className="text">2</span>
                </div>
                {/* <div className="bg-green-300"key="3" >
                    <span className="text">3</span>
                </div> */}
            </ResponsiveGridLayout>
            
            
        </>
    )
}

