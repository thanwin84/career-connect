import React from "react";
import {
    AreaChart as AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";

export default function AreaChartComponent({data}){
    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />\
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8"/>
            </AreaChart>
        </ResponsiveContainer>
    )
}