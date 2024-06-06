"use client";

import React from "react";
import GridLayout, {Responsive, WidthProvider} from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function TestStuff() {
    const layout1 = [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 1, h: 2,},
        { i: "c", x: 4, y: 0, w: 1, h: 2 },
    ]
    const layout2 = [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 1, h: 2 },
        { i: "c", x: 2, y: 0, w: 1, h: 2 },
    ]

    return (
        <>

            <ResponsiveGridLayout
                className="layout react-grid-layout overflow-none"
                layouts={[layout1, layout2]}
                breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 480, xxs: 250}}
                cols={{ lg: 10, md: 8, sm: 4, xs: 2, xxs: 1}}
            >
                <div className="bg-black react-grid-item select-none" key="a">a</div>
                <div className="bg-black react-grid-item select-none" key="b">b</div>
                <div className="bg-black react-grid-item select-none" key="c">c</div>
            </ResponsiveGridLayout>
        </>
    )
}