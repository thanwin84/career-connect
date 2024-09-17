import {useState} from "react";
import { 
    Input,
    Select,
    Button,
    SelectOptionsInput,
} from "../ui"
import {
    SalaryRange,
    Location
} from '.'
import {
    JOB_STATUS,
    JOB_TYPE,
    experianceLevel
} from '../../../../utils/constants'
import { useForm, FormProvider} from "react-hook-form"

export default function CreateJobForm({
    countries, 
    job, 
    title,
    buttonText,
    onSave,
    isLoading
}){
    
    const [experiance, setExperiance] = useState(job?.experianceLevel || "")
    const methods = useForm({
        defaultValues: {
            company: job?.company || "SE",
            position: job?.position || "astha it",
            country: job?.country || "",
            jobLocation: job?.jobLocation || "",
            jobStatus: job?.jobStatus || JOB_STATUS.INTERVIEW,
            jobType: job?.jobType || JOB_TYPE.FULL_TIME,
            salary: {
                min: 0 || job?.salary?.min,
                max: 0 || job?.salary?.max
            },
            experianceLevel: job?.experianceLevel || null
        }
    })
   
    
    
    function handleSelect(level){
        setExperiance(level)
        methods.setValue("experianceLevel", level)
    }
    
    return (
       <FormProvider {...methods}>
         <form method="post" onSubmit={methods.handleSubmit(onSave)}>
            <div className="p-8 shadow-md bg-white  dark:bg-zinc-900 rounded-md">
                <h2 className="text-2xl mb-6 text-gray-800 font-medium dark:text-slate-100">{title}</h2>
                <div className="">
                    <div className="lg:flex gap-4">
                        <Input 
                            label="Position"
                            className="mt-2"
                            {...methods.register("position", {required: "Position is required"})
                            }
                            errorMessage={methods.formState.errors.position?.message}
                        />
                        <Input 
                            label="Company"
                            className="mt-2"
                            {...methods.register("company", {required: "Company is required"})}
                            errorMessage={methods.formState.errors.company?.message}
                        />
                    </div>
                        <Location 
                            className="mt-2" 
                            countries={countries}
                            country={methods.formState.defaultValues.country}
                            jobLocation={methods.formState.defaultValues.jobLocation}
                        />
                        <div className="lg:flex gap-4">
                            <Select 
                                options={Object.values(JOB_STATUS)}
                                label="Job Status"
                                className="flex-1 mt-2"
                                {...methods.register("jobStatus")}
                            />
                            <Select 
                                options={Object.values(JOB_TYPE)}
                                label="Job Type"
                                className="flex-1 mt-2"
                                {...methods.register("jobType")}
                            />
                        </div>
                        <div className="mt-2">
                            <span  className="block mb-2  text-slate-600 dark:text-slate-200">Select Experiance</span>
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
                        />
                        
                        <div className="flex justify-end">
                            <Button
                                category="success"
                                type="submit"
                                classname="mt-6"
                                loading = {isLoading}
                                loadingText={"In progress..."}
                            >
                                    {buttonText}
                            </Button>
                        </div>
                </div>
                

            </div>
         </form>
       </FormProvider>
    )
}