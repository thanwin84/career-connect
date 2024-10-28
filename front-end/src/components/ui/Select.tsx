import  {forwardRef, SelectHTMLAttributes, useId, useState} from "react";
import FormError from "./FormError";

type Props = {
    label?: string
    options: string[]
    className?:string
    name: string
    errorMessage?: string
} & SelectHTMLAttributes<HTMLSelectElement>

 const  Select = forwardRef<HTMLSelectElement, Props>(({
    label,
    options=[],
    className,
    name,
    errorMessage,
    ...props
    
}:Props, ref)=>{
    const [touch, setTouch] = useState(false)
    const style = "px-4 py-2 bg-slate-50 dark:bg-zinc-700 w-full text-back dark:text-slate-200 focus:outline-none border border-gray-200  focus:border-none rounded-md  "
    const errorStyle = "border-red-400  focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500"
    const success = "border border-green-400 focus:ring-2 focus:ring-green-300"
    const id = useId()
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={id} className="mb-2 pl-1 inline-block text-slate-600 dark:text-slate-200">{label}</label>}
            <select
                id={id}
                name={name}
                {...props}
                ref={ref}
                onFocus={()=>setTouch(true)}
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
            {errorMessage && <FormError message={errorMessage} id={id} />}
        </div>
    )
})

export default Select