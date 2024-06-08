import React from "react";
import Dots from "../icons/dots";

export default function DragComponent() {
    return (
        <div className="h-[55px] flex flex-row items-center">
            <div className="px-[13px] py-[15px]">
                <div className="draggable-handle cursor-pointer">
                    {/* On drag here */}
                    <Dots />
                </div>
            </div>
        </div>
    )
}
