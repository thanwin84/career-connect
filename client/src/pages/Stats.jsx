import React from "react";
import customFetch from "../utils/customFetch";
import { ChartsContainers, StatsContainer } from "../components/stats";
import { useLoaderData } from "react-router-dom";



export const loader = async()=>{
    try {
        const response = await customFetch.get("/jobs/show-stats")
        return response.data
    } catch (error) {
        return error
    }
}

export default function Stats(){
    const {defaultStats, monthlyApplications} = useLoaderData()
    
    return (
        <div className="">
         <StatsContainer defaultStats={defaultStats} />
         {monthlyApplications?.length > 1 && (
            <ChartsContainers data={monthlyApplications} />
         )}
        </div>
    )
}