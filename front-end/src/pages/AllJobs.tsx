import  {useContext, createContext} from "react";
import { JobsContainer, SearchJobsContainer } from "../components/userCreatedJobs";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUserJobsRequest } from "../apiRequest";
import { GetUserJobsApiResponse, UserJobSearchParams } from "../types";

type LoaderType = {
    data:GetUserJobsApiResponse
    searchValues: UserJobSearchParams
}

export const loader = async({request}:any)=>{
    
    const params = Object.fromEntries(new URL(request.url).searchParams.entries())
    try {
        const data = await getCurrentUserJobsRequest(params)
        return {data, searchValues: params}
    } catch (error:any) {
        toast.error(error?.response?.data?.message) 
        return error
    }
}

const allJobsContext = createContext<LoaderType | undefined>(undefined)

type Props = {
    className?: string
}


export default function AllJobs({}:Props){
    const {data, searchValues} = useLoaderData() as LoaderType
    
    return (
        <allJobsContext.Provider value={{
            searchValues,
            data
            }}>
            <section className="dark:bg-zinc-700">
                <SearchJobsContainer />
                <JobsContainer />
            </section>
        </allJobsContext.Provider>
    )
}
export const useAllJobsContext = ()=> {
    const context = useContext(allJobsContext)
    if (!context){
        throw new Error("UseAllJobsContext must be used within AllJobs component")
    }
    return context
}