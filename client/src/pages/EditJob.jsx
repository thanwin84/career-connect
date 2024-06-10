
import React from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData, Form, useNavigation, redirect } from "react-router-dom";
import { Input, Select, Button } from "../components";
import { JOB_TYPE, JOB_STATUS } from "../../../utils/constants";

export const action = async({params, request})=>{
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    
    try {
        await customFetch.patch(`/jobs/${params.id}`, data)
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
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}


export default function EditJob(){
    const {job} = useLoaderData()
    
    const isSubmitting = useNavigation().state === 'submitting'
    
    return (
        <main className="  p-6">
            <Form method="post">
            <div className="p-8 shadow-md bg-white dark:bg-zinc-900 rounded-md">
                <h2 className="text-2xl mb-6 dark:text-slate-200">Edit Job</h2>
                <div className="grid lg:grid-cols-3 gap-4">
                    <Input 
                            label="Position"
                            name="position"
                            required={true}
                            defaultValue={job.position}
                        />
                        <Input 
                            label="Company"
                            name="company"
                            required={true}
                            defaultValue={job.company}
                        />
                        <Input 
                            label="Job Location"
                            name="jobLocation"
                            defaultValue={job.jobLocation}
                        />
                        <Select 
                            options={Object.values(JOB_STATUS)}
                            label="Job Status"
                            name="jobStatus"
                            className="flex-1"
                            defaultValue={job.jobStatus}
                            
                        />
                        <Select 
                            options={Object.values(JOB_TYPE)}
                            label="Job Type"
                            name="jobType"
                            className="flex-1"
                            defaultValue={job.JOB_TYPE}
                            
                        />
                        <div className="flex flex-1 flex-col justify-end">
                            <Button
                                type="submit"
                                classname=""
                                disabled = {isSubmitting}
                            
                            >
                                {isSubmitting ? "updating....": "Update"}
                            </Button>
                        </div>
                </div>

            </div>
         </Form>
        </main>
    )
}