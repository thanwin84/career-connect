import React from "react"


export default function Checkbox({label, name, ...props}){
    return (
        <div>
        <input type="checkbox" id={name} className="w-4 h-4" {...props}/>
        <label className="ml-4 text-slate-800 dark:text-slate-300" htmlFor={name}>{label}</label>
        </div>
    )
}