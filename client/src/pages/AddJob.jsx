import React from "react";
import { 
    Input,
    Select,
    Button
} from "../components";
import {
    useOutletContext,
    Form, 
    useNavigation,
    redirect
} from 'react-router-dom'
import {
    JOB_STATUS,
    JOB_TYPE
} from '../../../utils/constants'
import customFetch from "../utils/customFetch";
import {toast} from 'react-toastify'

export const action = async({request})=>{
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    
    try {
        await customFetch.post("/jobs", data)
        toast.success("Job Addes successfully", {autoClose: 2000})
        return redirect("all-jobs")
    } catch (error) {
        toast.success(error?.reponse?.data?.message, {autoClose: 3000})
        return null
    }
}

export default function AddJob(){
    const {user} = useOutletContext()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    return (
        <section className="dark:bg-slate-800 dark:text-white bg-slate-100 h-screen p-6 rounded-md">
         <Form method="post">
            <div className="p-8 shadow-md bg-white border">
                <h2 className="text-2xl mb-6">Add Job</h2>
                <div className="grid lg:grid-cols-3 gap-4">
                    <Input 
                            label="Position"
                            name="position"
                            required={true}
                            
                        />
                        <Input 
                            label="Company"
                            name="company"
                            required={true}
                        />
                        <Input 
                            label="Job Location"
                            name="jobLocation"
                            defaultValue={user.location}
                        />
                        <Select 
                            options={Object.values(JOB_STATUS)}
                            label="Job Status"
                            name="jobStatus"
                            className="flex-1"
                            
                        />
                        <Select 
                            options={Object.values(JOB_TYPE)}
                            label="Job Type"
                            name="jobType"
                            className="flex-1"
                            
                        />
                        <div className="flex flex-1 flex-col justify-end">
                            <Button
                                type="submit"
                                classname=""
                                disabled = {isSubmitting}
                            
                            >
                                {isSubmitting ? "Submitting....": "Submit"}
                            </Button>
                        </div>
                </div>

            </div>
         </Form>
        </section>
    )
}