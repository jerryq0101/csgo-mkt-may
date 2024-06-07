"use client";

import React, { useEffect, useState } from "react";
import {Responsive, WidthProvider} from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function TestStuff() {
    const [layouts, setLayouts] = useState({});

    // Initial Layout Setup
    // If localStorage exists, get it, if not, set it to default object
    useEffect(() => {
        const layout = JSON.parse(localStorage.getItem("layout"));
        if (layout) {
            setLayouts(layout);
        } else {
            setLayouts({});
        }
    }, [])

    // Update Layout for state and localStorage
    const updateL = (layout, layouts) => {
        setLayouts(layouts);
        console.log("Layout", layout);
        console.log("Layouts", layouts);
        localStorage.setItem("layout", JSON.stringify(layouts));
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

    // Steps:
    // Test if the format is actually accurate YES IT WORKS IN THIS FORMAT
    // Use the correct method to store the layout in localstorage

    const testLayout = {
        // "lg": [
        //     { i: "1", w: 3, h: 3, x: 0, y: 0, minW: 3, minH: 3 },
        //     { i: "2", w: 2, h: 3, x: 3, y: 0, minW: 2, minH: 3 },
        //     { i: "3", w: 2, h: 3, x: 5, y: 0, minW: 2, minH: 3 },
        //     { i: "4", w: 2, h: 3, x: 7, y: 0, minW: 2, minH: 3 },
        //     { i: "5", w: 2, h: 3, x: 9, y: 0, minW: 2, minH: 3 }
        // ],
        // "md": [
        //     { i: "1", w: 2, h: 2, x: Math.floor(Math.random() * 6), y: Math.floor(Math.random() * 6), minW: 2, minH: 2 },
        //     { i: "2", w: 2, h: 2, x: Math.floor(Math.random() * 6), y: Math.floor(Math.random() * 6), minW: 2, minH: 2 },
        //     { i: "3", w: 2, h: 2, x: Math.floor(Math.random() * 6), y: Math.floor(Math.random() * 6), minW: 2, minH: 2 },
        //     { i: "4", w: 2, h: 2, x: Math.floor(Math.random() * 6), y: Math.floor(Math.random() * 6), minW: 2, minH: 2 },
        //     { i: "5", w: 2, h: 2, x: Math.floor(Math.random() * 6), y: Math.floor(Math.random() * 6), minW: 2, minH: 2 }
        // ],
        // "sm": [
        //     { i: "1", w: 1, h: 2, x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5), minW: 1, minH: 2 },
        //     { i: "2", w: 1, h: 2, x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5), minW: 1, minH: 2 },
        //     { i: "3", w: 1, h: 2, x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5), minW: 1, minH: 2 },
        //     { i: "4", w: 1, h: 2, x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5), minW: 1, minH: 2 },
        //     { i: "5", w: 1, h: 2, x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5), minW: 1, minH: 2 }
        // ],
        // "xs": [
        //     { i: "1", w: 1, h: 1, x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4), minW: 1, minH: 1 },
        //     { i: "2", w: 1, h: 1, x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4), minW: 1, minH: 1 },
        //     { i: "3", w: 1, h: 1, x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4), minW: 1, minH: 1 },
        //     { i: "4", w: 1, h: 1, x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4), minW: 1, minH: 1 },
        //     { i: "5", w: 1, h: 1, x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4), minW: 1, minH: 1 }
        // ],
        // "xxs": [
        //     { i: "1", w: 1, h: 1, x: Math.floor(Math.random() * 2), y: Math.floor(Math.random() * 2), minW: 1, minH: 1 },
        //     { i: "2", w: 1, h: 1, x: Math.floor(Math.random() * 2), y: Math.floor(Math.random() * 2), minW: 1, minH: 1 },
        //     { i: "3", w: 1, h: 1, x: Math.floor(Math.random() * 2), y: Math.floor(Math.random() * 2), minW: 1, minH: 1 },
        //     { i: "4", w: 1, h: 1, x: Math.floor(Math.random() * 2), y: Math.floor(Math.random() * 2), minW: 1, minH: 1 },
        //     { i: "5", w: 1, h: 1, x: Math.floor(Math.random() * 2), y: Math.floor(Math.random() * 2), minW: 1, minH: 1 }
        // ]
    }


    // Steps
    // Use a default object to setup if localStorage is empty
        // If localStorage not empty, use localStorage object, add to it maybe
        // If it is empty, use {}
    // Make updateLS(layout, layouts) function (Needs to update+/add the breakpoint : layout)
        // also updates the state here to update stuff live



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
                className="layout bg-red-300"
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                layouts={layouts}
                onLayoutChange={updateL}
            >
                <div className="bg-green-300"key="1" >
                    <span className="text">1</span>
                </div>
                <div className="bg-green-300"key="2" >
                    <span className="text">2</span>
                </div>
                <div className="bg-green-300"key="3" >
                    <span className="text">3</span>
                </div>
                <div className="bg-green-300"key="4" >
                    <span className="text">4</span>
                </div>
                <div className="bg-green-300"key="5" >
                    <span className="text">5</span>
                </div>

                
            </ResponsiveGridLayout>
            
        </>
    )
}

