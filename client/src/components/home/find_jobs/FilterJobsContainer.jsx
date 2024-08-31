import React, {useState} from "react";
import {
    MultipleSelect,
    SingleOptionSelector,
    
} from "../../../components"
import { 
    JOB_SORT_BY, 
    JOB_TYPE,
    experianceLevel 
} from "../../../../../utils/constants";
import { Form, useLocation, useNavigate, useSubmit } from "react-router-dom";
import { useFindJobsContext } from "../../../pages/FindJobs";

export default function FilterJobsContainer({
    className
}){
    
    const submit = useSubmit()
    const {search} = useLocation()
    const {formState, resetFormState, updateFormState} = useFindJobsContext()
    const navigate = useNavigate()
    
   
    function handleSelect(option, key){
        const newOptions = formState[key].includes(option) ? formState[key].filter(item => item !== option): [...formState[key], option]
        updateFormState({[key]: newOptions})
        let params = new URLSearchParams(search)
        params.delete(`${key}[]`)
        newOptions.forEach(option => {
            params.append(`${key}[]`, option)
        })
        
        submit(params)
    }
    function handleSingleSelect(option, key){
        updateFormState({[key]: option})
        let params = new URLSearchParams(search)
        params.delete(key)
        params.set(key, option)
        submit(params)
    }
    function handleClearFilter(){
        resetFormState()
        navigate('/home')
    }
    
    return (
        <Form className={` bg-white dark:bg-zinc-900  shadow-md ${className} px-2`}>
            <div className="flex justify-between px-3 py-3 border-b border-gray-300 dark:border-gray-500">
                <span className="font-medium text-gray-700 dark:text-slate-300">Filter</span>
                <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 "
                    onClick={handleClearFilter}
                >
                    Clear All

                </button>
            </div>
            <MultipleSelect
                options={Object.values(JOB_TYPE)}
                title="Job Type"
                onSelect={(option)=>handleSelect(option, 'jobType')}
                selectedOptions={formState.jobType}
            />
            <MultipleSelect
                options={Object.values(experianceLevel)}
                title="Experiance"
                onSelect={(option)=>handleSelect(option, 'experianceLevel')}
                selectedOptions={formState.experianceLevel}
            />
            <SingleOptionSelector
                title="Sort By"
                options={Object.values(JOB_SORT_BY)}
                selectedOption={formState.sort}
                onSelect={(option)=>handleSingleSelect(option, 'sort')}
                className="border-none"
            />
            
        </Form>
    )
}