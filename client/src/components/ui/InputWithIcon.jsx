import React from "react";

export default function InputWithIcon({
    icon,
    type="text",
    name, 
    className,
    placeholder, 
    ...props }
){
    return (
        <div className={`relative w-full ${className}`} >
            <input
                type={type}
                name={name}
                className="border border-gray-200 w-full pl-8 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-700 text-black dark:text-slate-100 outline-none  focus:ring-1 dark:ring-slate-100"
                placeholder= {placeholder || ""}
                {...props}
            />
            <div className="text-xl text-gray-400 dark:text-slate-100 absolute inset-y-0 flex items-center m-1">
                {icon}
            </div>
         </div>
    )
}