import React from "react";
import {JobCard, Pagination} from '../../../components'
import { useFindJobsContext } from "../../../pages/FindJobs";
import { useLocation, useNavigate } from "react-router-dom";

// const jobs = [
//     {
//         company: "Astha IT",
//         position: "Software Engineer",
//         country: "Bangladesh",
//         jobLocation: "Dhaka",
//         salary: { min: "20000", max: "35000" },
//         createdAt: "2024-08-24T17:03:04.452Z",
//         save: true
//     },
//     {
//         company: "Google",
//         position: "Frontend Developer",
//         country: "United States",
//         jobLocation: "Mountain View, CA",
//         salary: { min: "100000", max: "150000" },
//         createdAt: "2024-08-20T09:15:30.100Z",
//         save: false
//     },
//     {
//         company: "Microsoft",
//         position: "Backend Developer",
//         country: "United States",
//         jobLocation: "Redmond, WA",
//         salary: { min: "95000", max: "140000" },
//         createdAt: "2024-08-22T12:47:15.452Z",
//         save: true
//     },
//     {
//         company: "Amazon",
//         position: "DevOps Engineer",
//         country: "Canada",
//         jobLocation: "Toronto",
//         salary: { min: "85000", max: "120000" },
//         createdAt: "2024-08-23T14:28:44.652Z",
//         save: true
//     },
//     {
//         company: "Tesla",
//         position: "Data Scientist",
//         country: "Germany",
//         jobLocation: "Berlin",
//         salary: { min: "90000", max: "130000" },
//         createdAt: "2024-08-21T16:35:25.978Z",
//         save: false
//     },
//     {
//         company: "Shopify",
//         position: "Full Stack Developer",
//         country: "Canada",
//         jobLocation: "Ottawa",
//         salary: { min: "80000", max: "110000" },
//         createdAt: "2024-08-25T11:22:54.337Z",
//         save: true
//     }
// ];


export default function FindJobsContainer({
    className,
    
}){
    const {jobs, totalPages, page, jobsCount} = useFindJobsContext()
    

    const {pathname, search} = useLocation()
    const navigate = useNavigate()
    
    
    
    function handlePageChange(pageNumber){
        const query = new URLSearchParams(search)
        query.set('page', pageNumber)
        navigate(`${pathname}?${query}`)
    }
    return (
        <section className={`w-full  ${className}`}>
            {jobsCount > 0 && <p className="mb-3 text-sm font-semibold text-gray-400 dark:text-slate-400" >{jobsCount} jobs Found</p>}
            {jobsCount === 0 && (
                <p className="text-3xl dark:text-gray-500 text-gray-400">
                    No Maching Jobs found
                </p>
            )}
         {jobs?.map((job, index) => (
            <JobCard
                key={job.company + index}
                className="mb-2"
                {...job}
            />
         ))}
         {totalPages > 1 && (
            <Pagination
                totalPages={Number(totalPages)}
                currentPage={Number(page)}
                handlePageChange={handlePageChange}
                position="center"
            />
         )}
        </section>
    )
}