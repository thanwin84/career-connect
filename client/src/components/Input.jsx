import React, {useId} from "react";

const Input = function({
    type,
    label, 
    placeholder, 
    className="", 
    name,
    ...props}){
    const id = useId()

    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="block mb-2  text-slate-600 dark:text-slate-200">{label}</label>}
            <input
                type={type}
                id = {id}
                placeholder={placeholder}
                className={`border border-gray-200 w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-700 text-black dark:text-slate-100 outline-none  focus:ring-1 dark:ring-slate-100 ${className}`}
                name={name}
                {...props}
            />
            
        </div>
    )
}
export default Input