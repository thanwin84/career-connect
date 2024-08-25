
import React from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { 
    useLoaderData, 
    redirect 
} from "react-router-dom";
import {  CreateJobForm } from "../components";

export const action = async({params, request})=>{
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const {company, position, jobStatus, country, jobLocation, jobType,experianceLevel, min, max} = Object.fromEntries(formData)
    const ob = {
        company,
        position,
        jobStatus,
        country,
        jobLocation,
        jobType,
        experianceLevel,
        salary: {min: min, max: max}
    }
    
    try {
        await customFetch.patch(`/jobs/${params.id}`, ob)
        toast.success("Job is updated successfully")
        return redirect("../all-jobs")
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
    
}

export const loader = async({params})=>{
    const id = params.id
    try {
        const {data} = await customFetch.get(`/jobs/${id}`)
        const {data:data2} = await customFetch.get('/records/countries')
        const ob = {job: data.job, countries:data2.data}
        
        return ob
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}


export default function EditJob(){
    const {job, countries} = useLoaderData()
    
    return (
        <main className="  p-6">
          <CreateJobForm
            countries={countries}
            job={job}
            title= "Edit Job"
            buttonText= "Save Changes"
           />
        </main>
    )
}