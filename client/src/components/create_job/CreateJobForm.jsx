import React, {useState} from "react";
import { 
    Input,
    Select,
    Button,
    SelectOptionsInput,
    Location,
    SalaryRange
} from "../../components"
import { Form, useNavigation } from "react-router-dom";
import {
    JOB_STATUS,
    JOB_TYPE,
    experianceLevel
} from "../../../../utils/constants"

export default function CreateJobForm({countries, job, title, buttonText}){
    const [experiance, setExperiance] = useState(job?.experianceLevel || "")
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    const initialJobValues = {
        company: job?.company || "",
        position: job?.position || "",
        country: job?.country || "",
        jobLocation: job?.jobLocation || "",
        jobStatus: job?.jobStatus || JOB_STATUS.INTERVIEW,
        jobType: job?.jobType || JOB_TYPE.FULL_TIME,
        min: job?.salary.min || "",
        max: job?.salary.max || "",
        experianceLevel: job?.experianceLevel || null
    }
    
    function handleSelect(level){
        setExperiance(level)
    }
    return (
        <Form method="post">
            <div className="p-8 shadow-md bg-white  dark:bg-zinc-900 rounded-md">
                <h2 className="text-2xl mb-6 dark:text-slate-100">{title}</h2>
                <div className="">
                    <div className="lg:flex gap-4">
                        <Input 
                            label="Position"
                            name="position"
                            required={true}
                            className="mt-2"
                            defaultValue={initialJobValues.position}
                        />
                        <Input 
                            label="Company"
                            name="company"
                            required={true}
                            className="mt-2"
                            defaultValue={initialJobValues.company}
                        />
                    </div>
                        <Location 
                            className="mt-2" 
                            countries={countries}
                            country={initialJobValues.country}
                            jobLocation={initialJobValues.jobLocation}
                        />
                        <div className="lg:flex gap-4">
                            <Select 
                                options={Object.values(JOB_STATUS)}
                                label="Job Status"
                                name="jobStatus"
                                className="flex-1 mt-2"
                                defaultValue={initialJobValues.jobStatus}
                                
                            />
                            <Select 
                                options={Object.values(JOB_TYPE)}
                                label="Job Type"
                                name="jobType"
                                className="flex-1 mt-2"
                                defaultValue={initialJobValues.jobType}
                            />
                        </div>
                        <div className="mt-2">
                            <span  className="block mb-2   dark:text-slate-200">Select Experiance</span>
                            <SelectOptionsInput 
                                options={Object.values(experianceLevel)}
                                select={experiance}
                                onOptionClick={handleSelect}
                                name="experianceLevel"
                                className= "mt-4"
                            />
                        </div>
                        <SalaryRange 
                            className="mt-2" 
                            min={initialJobValues.min}
                            max={initialJobValues.max}
                        />
                        
                        <Button
                            type="submit"
                            classname="mt-6"
                            disabled = {isSubmitting}
                        >
                                {buttonText}
                        </Button>
                </div>
                

            </div>
         </Form>
    )
}