"use client";

import React, { useEffect, useState} from "react";
import GridLayout, {Responsive, WidthProvider} from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function TestStuff() {
    const layouts = {}
    
    return (
        <>
            <ResponsiveGridLayout
                className="layout bg-red-300"
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                layouts={layouts}
            >
                <div className="bg-green-300"key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">1</span>
                </div>
                <div className="bg-green-300"key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">2</span>
                </div>
                <div className="bg-green-300"key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">3</span>
                </div>
                <div className="bg-green-300"key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">4</span>
                </div>
                <div className="bg-green-300"key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">5</span>
                </div>
            </ResponsiveGridLayout>
            
        </>
    )
}