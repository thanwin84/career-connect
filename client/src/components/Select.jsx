import React, {useId} from "react";


export default function Select({
    label,
    options=[],
    className,
    name,
    ...props
    
}){
    const id = useId()
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={id} className="mb-2 pl-1 inline-block text-slate-600 dark:text-slate-200">{label}</label>}
            <select
                name={name}
                {...props}
                id={id}
                className={`w-full px-4 py-2 custom-select bg-gray-50 rounded-md border border-gray-200 dark:bg-zinc-700 dark:text-slate-200`}
                
            >
                {
                    options?.map(option =>(
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }

            </select>
        </div>
    )
}