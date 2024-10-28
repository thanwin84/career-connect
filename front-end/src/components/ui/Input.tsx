import {forwardRef, InputHTMLAttributes, useId, useState} from "react";
import FormError from "./FormError";

type Props = {
    label?: string
    placeholder?: string
    errorMessage?: string
    className?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(function({
    label, 
    placeholder,
    errorMessage,
    className="", 
    ...props
}:Props, ref){
    const [touch, setTouch] = useState(false)
    const id = useId()
    const style = "px-4 py-2 bg-slate-50 dark:bg-zinc-700 w-full text-back dark:text-slate-200 focus:outline-none border border-gray-200  focus:border-none rounded-md  "
    const errorStyle = "border-red-400  focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500"
    const success = "border border-green-400 focus:ring-2 focus:ring-green-300"
    
    return (
        <div className={`w-full`}>
            {label && <label htmlFor={id} className="block mb-2  text-slate-600 dark:text-slate-200">{label}</label>}
            <input
                id = {id}
                ref={ref}
                placeholder={placeholder}
                className={`${style} ${errorMessage ? errorStyle: ""} ${(touch && errorMessage == "")?  success: ""} ${className}`}
                onFocus={()=>setTouch(true)}
                aria-label={label}
                aria-describedby={errorMessage ? `${id}Error`:undefined}
                {...props}
                
            />
            {errorMessage && <FormError 
                                id={`${id}Error`} 
                                message={errorMessage}
                             />
            }
        </div>
    )
})
export default Input