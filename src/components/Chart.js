"use client";

import React, { useEffect, useRef, useContext } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { GlobalContext } from '../app/GlobalContext';
import Dots from "./icons/dots";

function separatePriceVolumeSeries(data){
    const priceData = [];
    const volumeData = [];
    
    data.forEach(item => {
        priceData.push({
            time: item.time,
            value: item.price,
        });
        volumeData.push({
            time: item.time,
            value: item.volume,
            color: "#2962FF",
        });
    });
    return { priceData, volumeData };
}

export default function Chart() {
    const { data, loading } = useContext(GlobalContext);
    const chartContainerRef = useRef();

    useEffect(() => {
        const { priceData, volumeData } = separatePriceVolumeSeries(data);

        const chart = createChart(chartContainerRef.current, {
            layout: {
                textColor: 'black',
                background: { type: 'solid', color: '#E5E5E5' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });

        // Function to handle resize
        function handleResize() {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        }

        const newSeries = chart.addAreaSeries({
            lineColor: "#2962FF",
            topColor: "#2962FF",
            bottomColor: "rgba(41, 98, 255, 0.28)",
        });

        newSeries.setData(priceData)

        // Set Price scale margins
        // Also adding volume histogram series

        newSeries.priceScale().applyOptions({
            scaleMargins: {
                // positioning the price scale for the area series
                top: 0.1,
                bottom: 0.4,
            },
        });

        const volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '', // set as an overlay by setting a blank priceScaleId
            // set the positioning of the volume series
            scaleMargins: {
                top: 0.6, // highest point of the series will be 70% away from the top
                bottom: 0,
            },
        });
        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8, // highest point of the series will be 70% away from the top
                bottom: 0,
            },
        });
        volumeSeries.setData(volumeData);

        chart.timeScale().fitContent();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        }
    }, [data, loading])

    return (
        <div className="bg-neutral-200 w-fit flex flex-col rounded-xl   ">
            <div className="h-[55px] w-full flex flex-row items-center">
                        <div className="px-[13px] py-[15px]">
                            <div className="cursor-pointer">
                                {/* On drag here */}
                                <Dots />
                            </div>
                        </div>
            </div>
            <div className="px-[50px] pb-[50px]">
                <div ref={chartContainerRef} className="w-[800px]" />
            </div>
        </div>
    )
}