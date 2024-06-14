import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAllJobsContext } from "../pages/AllJobs";
import { useLocation, useNavigate } from "react-router-dom";

export default function PageButtonContainer(){
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
    function pageButton({pageNumber, activePage}){
       
        return (
            <button
                className={`px-4 py-2 text-blue-700 dark:bg-zinc-900 dark:text-slate-100 bg-white shadow-ld rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 hover:text-white ${activePage && "bg-blue-800 dark:bg-blue-800 text-white"}`}
                key={pageNumber}
                onClick={()=>handlePageChange(pageNumber)}
            >
                {pageNumber}
            </button>
        )
    }
    const displayPageButtons = ()=>{
        const pageButtons = []
        // first page
        pageButtons.push(pageButton(
            {
                pageNumber: 1, 
                activePage: currentPage === 1
            }
            ))
        if (currentPage > 3){
            pageButtons.push(
                <span className="font-bold px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-md text-blue-700">...</span>
            )
        }
        // before current page
        if (currentPage !== 1 && currentPage !== 2){
            console.log("before current page")
            pageButtons.push(
                pageButton({
                    pageNumber: currentPage - 1,
                    activePage: false
                })
            )
        }

        // current page
        if (currentPage !== 1 && currentPage !== totalPages){
            console.log("current page")
            pageButtons.push(
                pageButton({
                    pageNumber: currentPage,
                    activePage: true
                })
            )
        }
        if (currentPage !== totalPages && currentPage !== totalPages - 1){
            console.log("after current page")
            pageButtons.push(
                pageButton({
                    pageNumber: currentPage + 1,
                    activePage: false
                })
            )
        }
        if (currentPage < totalPages - 2){

            pageButtons.push(
                <span key ="dot-2" className="font-bold px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-md text-blue-700">...</span>
            )
        }
        //last page

        pageButtons.push(pageButton(
            {pageNumber:totalPages, 
            activePage: currentPage === totalPages})
        )
        return pageButtons
    }
    return (
        <div className="flex py-6 px-2 justify-end">
            {currentPage > 1 && (
                <button
                    className="px-4 py-2 text-blue-700 dark:text-slate-100 bg-white dark:bg-zinc-900 shadow-lg rounded-md flex gap-2 items-center  hover:bg-blue-700 dark:hover:bg-blue-700  hover:text-white  mr-4"
                    onClick={()=>{
                        let pageNumber = currentPage - 1
                        handlePageChange(pageNumber)
                    }}
                >
                    <HiChevronDoubleLeft />
                    Prev
                </button>
            )}
            <div className="flex gap-2">
                {displayPageButtons()}
            </div>
            
            {currentPage !== totalPages && (
                <button
                    className="ml-2 px-4 py-2 text-blue-700 dark:text-slate-100 bg-white dark:bg-zinc-900 shadow-lg rounded-md flex gap-2 my-auto items-center hover:bg-blue-700 dark:hover:bg-blue-700 hover:text-white"
                    onClick={()=> handlePageChange(currentPage + 1)}
                >
                    Next
                    <HiChevronDoubleRight />
                    
                </button>
            )}
        </div>
    )
}