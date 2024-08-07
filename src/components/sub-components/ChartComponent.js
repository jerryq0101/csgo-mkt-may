"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { GlobalContext } from '../../app/GlobalContext';

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
    const { query } = useContext(GlobalContext);
    const [crossHairPrice, setCrossHairPrice] = useState(null);
    const [crossHairVolume, setCrossHairVolume] = useState(null);
    const [crossHairTime, setCrossHairTime] = useState(null);
    const chartContainerRef = useRef(null);

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

        console.log(chartContainerRef.current.clientWidth);


        // Function to handle resize
        function handleResize() {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
            chart.timeScale().fitContent();
        }
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(chartContainerRef.current);

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
                top: 0.4,
                bottom: 0.15,
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

        chart.subscribeCrosshairMove((param) => {
            if (param.time && param.seriesData) {
                const price = param.seriesData.get(newSeries).value;
                const volume = param.seriesData.get(volumeSeries).value;
                setCrossHairPrice(price);
                setCrossHairVolume(volume);
                setCrossHairTime(param.time);
            }
        });
        
        return () => {
            resizeObserver.unobserve(chartContainerRef.current);
            chart.remove();
        }
    }, [data, loading])

    return (
        <div className="bg-neutral-200 flex flex-col rounded-xl py-5">
            <div className="px-[50px] pb-[40px] w-full text-black select-none">
                <div ref={chartContainerRef} className="w-full h-[300px]" style={{position: "relative"}}>
                    {
                        query &&
                        <div style={{position: "absolute", top: 10, left: 20, zIndex: 20}}>
                            {query} <br />
                            Time: {crossHairTime} <br />
                            Price: {crossHairPrice ? crossHairPrice.toFixed(2): ""} {`\n`}<br />
                            Volume: {crossHairVolume}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}