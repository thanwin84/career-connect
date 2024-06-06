import React, {useContext, createContext} from "react";
import { JobsContainer, SearchJobsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async({request})=>{
    try {
        const {data} = await customFetch.get("/jobs")
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}

const allJobsContext = createContext()

export default function AllJobs(){
    const {jobs} = useLoaderData()
    
    return (
        <allJobsContext.Provider value={{jobs}}>
            <main className="bg-slate-100">
                <SearchJobsContainer />
                <JobsContainer />
            </main>
        </allJobsContext.Provider>
    )
}
export const useAllJobsContext = ()=> useContext(allJobsContext)