
import { 
    CreateJobForm
} from "../components/create_job";
import {
    useLoaderData
} from 'react-router-dom'
import {  getCountryListRequest } from "../apiRequest";
import { useCreateJob } from "../api/JobApi";



export const loader = async()=>{
    try {
        const countryList = await getCountryListRequest()
        
        return countryList
    } catch (error) {
        return error
    }
}


export default function AddJob(){
    const countries = useLoaderData()
    const {
        createJob,
        isPending
    } = useCreateJob()
    
    return (
        <section className=" dark:text-white p-6">
         <CreateJobForm 
            countries={countries}
            title="Add Job" 
            buttonText= "Create Job"
            onSave={createJob}
            isLoading={isPending}
         />
        </section>
    )
}

