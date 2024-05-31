"use client";

import React, { useEffect, useRef, useContext } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { GlobalContext } from '../app/GlobalContext';

export default function Chart() {
    const { data, loading } = useContext(GlobalContext);

    const chartContainerRef = useRef();

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout:  {
                background: {type: ColorType.Solid, color: 'white'}
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });
        chart.timeScale().fitContent();

        // Function to handle resize
        function handleResize() {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        }

        const newSeries = chart.addAreaSeries({
            lineColor: "#2962FF",
            topColor: "#2962FF",
            bottomColor: "rgba(41, 98, 255, 0)",
        });

        newSeries.setData(data)

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        }
    }, [data, loading])

    return (
        <div ref={chartContainerRef} className="w-full h-96" />
    )
}