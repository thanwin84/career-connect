import React from "react";

export default function SalaryRange({
    className,
    min,
    max
}){
    return (
        <div className={`w-full ${className}`} >
           <span  className="block mb-4   dark:text-slate-200">Salary Range</span>
            <div className="flex gap-4 mt-2 px-4">
                <div className="flex gap-2">
                    <span className="dark:text-slate-300 my-auto">Min</span>
                    <input
                        className="border border-gray-200 w-full px-2 py-1 text-sm rounded-sm bg-gray-50 dark:bg-zinc-700 text-black dark:text-slate-100 outline-none  focus:ring-1 dark:ring-slate-100"
                        name="min"
                        defaultValue={min}
                    />
                </div>
                <span className="">-</span>
                <div className="flex gap-2">
                    <span className=" dark:text-slate-300 my-auto">Max</span>
                    <input
                        name="max"
                        className="text-sm border border-gray-200 w-full px-2 py-1 rounded-sm bg-gray-50 dark:bg-zinc-700 text-black dark:text-slate-100 outline-none  focus:ring-1 dark:ring-slate-100"
                        defaultValue={max}
                    />
                </div>
            </div>
        </div>
    )
}