import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export default function BarChartComponent({data}){
    return (
        <ResponsiveContainer width="100%" height={300}>
        <BarChart width="100%" height={40} data={data}>
          <Bar dataKey="uv" fill="#8884d8" />
          <XAxis  dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" barSize={75}/>
        </BarChart>
      </ResponsiveContainer>
    )
}