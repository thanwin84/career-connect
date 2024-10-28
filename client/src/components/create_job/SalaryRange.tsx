import React, { useState } from "react";

export default function SalaryRange({
    className,
    min,
    max
}){
    return (
        <div className={`w-full ${className}`} >
           <span  className="block mb-4  text-slate-600 dark:text-slate-200">Salary Range</span>
            <div className="flex gap-4 mt-2 px-4">
                <SalaryInput 
                    className="" name='min' 
                    defaultValue={min} 
                />
                <span className="font-medium">-</span>
                <div className="flex gap-2">
                    <SalaryInput 
                        className="" 
                        name='max' 
                        defaultValue={max} 
                    />
                </div>
            </div>
        </div>
    )
}

function SalaryInput({className, name, defaultValue}){
    const [value, setValue] = useState(defaultValue || "")
    function handleChange(e){
        const newValue = e.target.value
        if (/^\d+$/.test(newValue) || newValue===""){
            setValue(newValue)
        }
    }
    return (
        <div className={`flex gap-3 px-4 ${className}`}>
            <span className="dark:text-slate-300 my-auto">Min</span>
            <input
                className="w-full dark:text-slate-200 focus:outline-none border-b-2 border-gray-300 px-2 focus:border-blue-300 dark:focus:border-blue-500 text-center text--700 font-semibold bg-transparent"
                name={name}
                value={value}
                autoComplete="off"
                onChange={handleChange}
            />
        </div>
    )
}