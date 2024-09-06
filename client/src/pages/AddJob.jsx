import React from "react";
import { 
    CreateJobForm
} from "../components/create_job";
import {
    redirect,
    useLoaderData
} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createJob, getCountryList } from "../API";


export const action = async({request})=>{
    const formData = await request.formData()
    const {company, position, jobStatus, country, jobLocation, jobType,experianceLevel, min, max} = Object.fromEntries(formData)
    const jobData = {
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
        await createJob(jobData)
        toast.success("Job Addes successfully", {autoClose: 2000})
        return redirect("all-jobs")
    } catch (error) {
        
        toast.success(error?.reponse?.data?.message, {autoClose: 3000})
        return null
    }
    
}

export const loader = async()=>{
    try {
        const countryList = await getCountryList()
        
        return countryList
    } catch (error) {
        return error
    }
}


export default function AddJob(){
    const countries = useLoaderData()
    
    
    return (
        <section className=" dark:text-white p-6">
         <CreateJobForm 
            countries={countries}
            title="Add Job" 
            buttonText= "Create Job"
         />
        </section>
    )
}

