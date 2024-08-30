import React, { createContext, useEffect, useState } from "react";
import { 
    FilterJobsContainer,
    SearchContainer,
    FindJobsContainer,
    JobDetails
 } from "../components";
import { customFetch } from "../utils";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";

export const loader = async({request})=>{
    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)
    const paramsObject = {
        jobType: params.getAll('jobType[]'),
        experianceLevel: params.getAll('experianceLevel[]'),
        location: params.get('location'),
        search: params.get('search'),
        sort: params.get('sort')
    }
    
    
    try {
        const {data} = await customFetch.get(`/jobs/all-jobs` + url.search)
        
        return {...data, paramsObject}
    } catch (error) {
        return error
    }
}

const findJobsContext = createContext()

export default function FindJobs(){
    const {
        jobs, 
        totalPages, 
        paramsObject,
        jobsCount,
        page
    } = useLoaderData()
    const [openDetails, setOpenDetails] = useState(true)
    const [currentJobDetails, setCurrentJobDetails] = useState("")
    const [formState, setFormState] = useState(
        {
            jobType: paramsObject.jobType || [],
            experianceLevel: paramsObject.experianceLevel || [],
            location: paramsObject.location || "",
            search: paramsObject.search || "",
            sort: paramsObject.sort || "newest"
        }
    )
    

    function resetFormState(){
        setFormState(
            {
                jobType: [],
                experianceLevel: [],
                location: "",
                search: "",
                sort: "newest"
            }
        )
    }
    
    function updateFormState(updates){
        setFormState(prev => ({...prev, ...updates}))
    }
    useEffect(()=>{
        setCurrentJobDetails(jobsCount > 0 ? jobs[0]: "")
    },[jobsCount])
    
    
    function handleCurrentJobDetails(job){
        setCurrentJobDetails(job)
    }
    function handleOpenDetails(){
        setOpenDetails(!openDetails)
    }
    return (
        <section className="w-full  px-10">
            <findJobsContext.Provider value={{
                handleCurrentJobDetails,
                handleOpenDetails,
                currentJobDetails,
                jobs,
                totalPages,
                paramsObject,
                jobsCount,
                page,
                formState,
                resetFormState,
                updateFormState
            }}>
                <SearchContainer 
                    className="mt-4  mb-2 "
                    defaultSearch={formState.search}
                    defaultLocation={formState.location}
                />
                <div className="flex gap-4 mt-4">
                    <div className="">
                        <FilterJobsContainer className="w-56 sticky top-0" />
                    </div>
                    <FindJobsContainer />
                    {currentJobDetails !== "" && (
                        <div className="w-4/6 h-screen sticky top-0 hover:overflow-y-scroll">
                            <JobDetails className= "" />
                        </div>
                    )}
                </div>
            </findJobsContext.Provider>
        </section>
    )
}

export const useFindJobsContext = ()=>useContext(findJobsContext)