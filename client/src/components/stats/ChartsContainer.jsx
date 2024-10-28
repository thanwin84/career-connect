import React, {useState} from "react";
import {BarChart,AreaChart} from "../stats"

export default function ChartsContainers({data}){
    const [barChart, setBarChart] = useState(true)
    return (
        <section className="bg-slate-100 dark:bg-zinc-800">
            <div className="text-center">
                <h4 className="text-xl dark:text-slate-200">Monthly Applications</h4>
                <button
                    className="text-xl text-green-600"
                    onClick={()=>setBarChart(!barChart)}
                >
                    {barChart ? "Area Chart": "Bar Chart"}
                </button>
            </div>
           <div className="p-10">
            {
                barChart ? <BarChart data={data} />: <AreaChart data={data} />
            }
           </div>
        </section>
    )
}