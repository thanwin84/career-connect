
import customFetch from "../utils/customFetch";
import { ChartsContainers, StatsContainer } from "../components/stats";
import { useLoaderData } from "react-router-dom";
type DefaultStats = {
   "pending": number
    "interview": number,
    "declined": number
}

type Loader = {
    defaultStats: DefaultStats
    monthlyApplications: {date: string, count: number}[]
}

export const loader = async():Promise<Loader | unknown>=>{
    try {
        const response = await customFetch.get("/jobs/show-stats")
        return response.data
    } catch (error) {
        return error
    }
}

export default function Stats(){
    const {defaultStats, monthlyApplications} = useLoaderData() as Loader
    
    return (
        <div className="">
         <StatsContainer defaultStats={defaultStats} />
         {monthlyApplications?.length > 1 && (
            <ChartsContainers data={monthlyApplications} />
         )}
        </div>
    )
}