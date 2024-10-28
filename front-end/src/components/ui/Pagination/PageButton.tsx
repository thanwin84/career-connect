import React from "react";

export default function PageButton({pageNumber, activePage, handlePageChange}){
    const pageBtnStyle = "px-4 py-2 bg-white dark:bg-zinc-900 text-blue-700 dark:text-white shadow-md rounded-md border dark:border-none hover:bg-blue-900 dark:hover:bg-blue-800 border-slate-300 hover:text-white"
    const activePageBtnStyle = "px-4 py-2 rounded-md text-white bg-blue-800 dark:bg-blue-800"
    return (
        <button
            className={activePage ? activePageBtnStyle: pageBtnStyle}
            key={pageNumber}
            onClick={()=>handlePageChange(pageNumber)}
        >
            {pageNumber}
        </button>
    )
}