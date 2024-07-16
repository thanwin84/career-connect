import React from "react";
import {Job, AllJobsPaginationContainer} from ".."
import { useAllJobsContext } from "../../pages/AllJobs";

export default function JobsContainer(){
    const {jobs, totalJobs, totalPages} = useAllJobsContext()
    
    if (jobs.length === 0){
        return (
            <div>
                <h2 className="text-3xl">No Jobs to display.....</h2>
            </div>
        )
    }
    return (
        <div>
            <h4 className="font-bold text-slate-600 dark:text-slate-200 mb-2 px-6">{totalJobs} job{jobs.length > 1 ? "s": ""} found</h4>
            <section className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 px-4">
            {jobs.map(job =>(
                <Job key={job._id} {...job}/>
            ))}
            
        </section>
        <div className="mr-2">
        { totalPages> 1 && (<AllJobsPaginationContainer />)}
        </div>
        </div>
    )
}