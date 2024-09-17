import {Pagination} from "../ui"
import {JobCard} from "../find_jobs"
import { useLocation, useNavigate } from "react-router-dom";
import { useFindJobsContext } from "../../pages/FindJobs";


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