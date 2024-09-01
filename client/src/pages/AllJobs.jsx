import React, {useContext, createContext} from "react";
import { JobsContainer, SearchJobsContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUserJobs } from "../API";

export const loader = async({request})=>{
    
    const params = Object.fromEntries(new URL(request.url).searchParams.entries())
    try {
        const data = await getCurrentUserJobs(params)
        return {data, searchValues: params}
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}

const allJobsContext = createContext()

export default function AllJobs(){
    const {data, searchValues} = useLoaderData()
    const {jobs, totalJobs, totalPages, currentPage} = data
    
    return (
        <allJobsContext.Provider value={{jobs, searchValues,totalJobs, totalPages, currentPage}}>
            <section className="dark:bg-zinc-800">
                <SearchJobsContainer />
                <JobsContainer />
            </section>
        </allJobsContext.Provider>
    )
}
export const useAllJobsContext = ()=> useContext(allJobsContext)