import React from "react";
import {Job} from "../components"
import { useAllJobsContext } from "../pages/AllJobs";

export default function JobsContainer(){
    const {jobs} = useAllJobsContext()
    
    if (jobs.length === 0){
        return (
            <div>
                <h2>No Jobs to Show</h2>
            </div>
        )
    }
    return (
        <div>
            <h4 className="font-bold text-slate-600 mb-2 px-6">{jobs.length} jobs found</h4>
            <section className="grid lg:grid-cols-2 md:grid-cols-2 gap-2 px-4">
            {jobs.map(job =>(
                <Job key={job._id} {...job}/>
            ))}
        </section>
        </div>
    )
}