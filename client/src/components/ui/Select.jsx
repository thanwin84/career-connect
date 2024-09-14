import React, {useId, useState} from "react";

export default function Select({
    label,
    options=[],
    className,
    name,
    errorMessage,
    defaultValue="",
    ...props
    
}){
    const [touch, setTouch] = useState(false)
    const style = "px-4 py-2 bg-slate-50 dark:bg-zinc-700 w-full text-back dark:text-slate-200 focus:outline-none border border-gray-200  focus:border-none rounded-md  "
    const errorStyle = "border-red-400  focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500"
    const success = "border border-green-400 focus:ring-2 focus:ring-green-300"
    const id = useId()
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={id} className="mb-2 pl-1 inline-block text-slate-600 dark:text-slate-200">{label}</label>}
            <select
                name={name}
                {...props}
                id={id}
                onFocus={()=>setTouch(true)}
                defaultValue= {defaultValue}
                className={`${style} ${errorMessage ? errorStyle: ""} ${(touch && errorMessage == "")?  success: ""} `}
                
            >
                <option value="" disabled >
                    Select to choose
                </option>
                {
                    options?.map(option =>(
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }

            </select>
            {errorMessage && <FormError message={errorMessage} />}
        </div>
    )
}