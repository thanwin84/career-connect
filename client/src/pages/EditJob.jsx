
import React from "react";
import { toast } from "react-toastify";
import { 
    useLoaderData, 
    redirect 
} from "react-router-dom";
import {  CreateJobForm } from "../components";
import {
    updateJob, 
    getJob, 
    getCountryList
} from '../API'

export const action = async({params, request})=>{
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
        await updateJob(params.id, jobData)
        toast.success("Job is updated successfully", {autoClose: 500})
        return redirect("../all-jobs")
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
    
}

export const loader = async({params})=>{
    try {
        const {data} = await getJob(params.id)
        const countryList = await getCountryList()
        const ob = {job: data.job, countries:countryList}
        
        return ob
    } catch (error) {
        toast.error(error?.response?.data?.message, {autoClose: 200})
        return error
    }
}


export default function EditJob(){
    const {job, countries} = useLoaderData()
    
    return (
        <main className="p-6">
          <CreateJobForm
            countries={countries}
            job={job}
            title= "Edit Job"
            buttonText= "Save Changes"
           />
        </main>
    )
}