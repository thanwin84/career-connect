import React, { useEffect, useState} from "react";
import {Button, Select, Input} from '../components'
import { useAllJobsContext } from "../pages/AllJobs";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { Form, useSubmit, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useDebounce } from "../hooks";

export default function SearchJobsContainer(){
    const submit = useSubmit()
    const {searchValues} = useAllJobsContext()
    const [searchTerm, setSearchTerm] = useState(searchValues.search || "")
    const debouncedValue = useDebounce(searchTerm)

    useEffect(()=>{
        submit({...searchValues, search: debouncedValue}, {method: "get"})
    },[debouncedValue, submit])
    console.log(searchValues)
    return (
        <Form className="p-6">
            <div className="px-4 py-6 bg-white dark:bg-zinc-900 rounded-md shadow-md">
                <h2 className="text-xl dark:text-slate-200 mb-4">Search Form</h2>
                <div className="grid lg:grid-cols-3 gap-4">
                    <Input 
                        label="Search"
                        type="search"
                        name="search"
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        defaultValue={searchValues.search}
                    />
                    <Select 
                        label="Job Status"
                        options={["all", ...Object.values(JOB_STATUS)]}
                        name="jobStatus"
                        onChange={(e)=> submit(e.target.form)}
                        defaultValue={searchValues.jobStatus}
                    />
                    <Select 
                        label = "Job Type"
                        name="jobType"
                        options={["all", ...Object.values(JOB_TYPE)]}
                        onChange={(e)=> submit(e.target.form)}
                        defaultValue={searchValues.jobType}
                    />
                    <Select 
                        label = "Sort"
                        name="sort"
                        options={[...Object.values(JOB_SORT_BY)]}
                        defaultValue={searchValues.sort}
                        onChange={(e)=> submit(e.target.form)}
                    />
                    <div className="flex flex-col justify-end">
                        <Link
                            to="../all-jobs"
                            className="w-full bg-blue-500 text-white text-center px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Reset to Default Values
                        </Link>
                    </div>
                    
                </div>
            </div>
        </Form>
    )
}