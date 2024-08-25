import React from "react";
import { 
    CreateJobForm
} from "../components";
import {
    useOutletContext,
    redirect,
    useLoaderData
} from 'react-router-dom'

import customFetch from "../utils/customFetch";
import {toast} from 'react-toastify'




export const action = async({request})=>{
    const formData = await request.formData()
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
        await customFetch.post("/jobs", ob)
        toast.success("Job Addes successfully", {autoClose: 2000})
        return redirect("all-jobs")
    } catch (error) {
        
        toast.success(error?.reponse?.data?.message, {autoClose: 3000})
        return null
    }
    
}

export const loader = async()=>{
    try {
        const {data} = await customFetch.get('/records/countries')
        
        return data.data
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

