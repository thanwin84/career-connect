import React from "react";
import { useAllJobsContext } from "../../pages/AllJobs";
import { useLocation, useNavigate } from "react-router-dom";
import {Pagination} from ".."


export default function AllJobsPaginationContainer(){
    let {totalJobs, totalPages, currentPage} = useAllJobsContext()
    totalJobs = Number(totalJobs)
    totalPages = Number(totalPages)
    currentPage = Number(currentPage)
    const {pathname, search} = useLocation()
    const navigate = useNavigate()

    

    function handlePageChange(pageNumber){
        
        const query = new URLSearchParams(search)
        query.set('page', pageNumber)
        const url = `${pathname}?${query}`
        
        navigate(url)
    }
    
    
    return (
        <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            className= "justify-end"
        />
    )
}