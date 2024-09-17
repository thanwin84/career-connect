import  { createContext, useState } from "react";
import { 
    FilterJobsContainer,
    SearchContainer,
    FindJobsContainer
 } from "../components/find_jobs";
 import { JobDetails, SlideOpen } from "../components/ui";
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
    const [openDetails, setOpenDetails] = useState(false)
    const [currentJobDetails, setCurrentJobDetails] = useState("")
    const [formState, setFormState] = useState(
        {
            jobType: paramsObject?.jobType || [],
            experianceLevel: paramsObject?.experianceLevel || [],
            location: paramsObject?.location || "",
            search: paramsObject?.search || "",
            sort: paramsObject?.sort || "newest"
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
    
    
    function toggleOpenDetails(){
        setOpenDetails(!openDetails)
    }
    
    function handleCurrentJobDetails(job){
        setCurrentJobDetails(job)
    }
    
   
    return (
        <section className="w-full  px-10">
            <findJobsContext.Provider value={{
                handleCurrentJobDetails,
                toggleOpenDetails,
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
                    className="mt-4  mb-2 rounded-md "
                    defaultSearch={formState.search}
                    defaultLocation={formState.location}
                />
                <div className="w-full lg:w-5/6  flex flex-col md:flex-row gap-10 mt-4 relative">
                    <FilterJobsContainer className="w-full mx-auto md:w-[280px] md:sticky md:top-0 md:self-start flex-none" />
                    <FindJobsContainer className="w-2/6 flex-grow"/>
                </div>
                
                <SlideOpen 
                    isOpen={openDetails} 
                    className="overflow-y-scroll"
                    closeFn={toggleOpenDetails}
                >
                        <JobDetails  />
                </SlideOpen>
                
            </findJobsContext.Provider>
        </section>
    )
}

export const useFindJobsContext = ()=>useContext(findJobsContext)