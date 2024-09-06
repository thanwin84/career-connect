import React from "react"

export default function SelectOptionsInput({
    options, 
    select, 
    onOptionClick,
    className,
    name
}){

    
    return (
        <>
        <ul className={`w-full flex gap-2 ${className}`}>
            {options.map(option => (
                <li 
                    key={option}
                    onClick={()=>onOptionClick(option)}
                    className= {`px-6 py-2 shadow-sm rounded-md cursor-pointer dark:border ${select !== "" && select === option ? 'bg-green-200 dark:text-green-700 text-slate-700': "dark:text-slate-200"}`}
                >
                    {option.substr(0,1).toUpperCase() + option.substr(1)}
                </li>
            ))}
        </ul>
        <input type="hidden" name={name} value={select} />
        </>
    )
}