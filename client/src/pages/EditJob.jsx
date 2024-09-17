
import { toast } from "react-toastify";
import { 
    useLoaderData, 
} from "react-router-dom";
import {  CreateJobForm } from "../components/create_job";
import {
    getJobRequest, 
    getCountryListRequest
} from '../apiRequest'
import {useUpdateJob} from '../api/JobApi'

export const loader = async({params})=>{
    try {
        const {data} = await getJobRequest(params.id)
        const countryList = await getCountryListRequest()
        const ob = {job: data.job, countries:countryList}
        
        return ob
    } catch (error) {
        toast.error(error?.response?.data?.message, {autoClose: 200})
        return error
    }
}


export default function EditJob(){
    const {job, countries} = useLoaderData()
    const {
        updateJob,
        isPending
    } = useUpdateJob()
    
    return (
        <main className="p-6">
          <CreateJobForm
            countries={countries}
            job={job}
            title= "Edit Job"
            buttonText= "Save Changes"
            onSave={updateJob}
            isLoading={isPending}
           />
        </main>
    )
}