import { forwardRef, InputHTMLAttributes } from "react"

type Props = {
    className?: string
    label?: string
    name?: string
} & InputHTMLAttributes<HTMLInputElement>

const Checkbox= forwardRef<HTMLInputElement, Props>(({label, name, ...props}:Props, ref)=>{
    return (
        <div>
        <input 
            type="checkbox" 
            id={name} 
            name={name} 
            ref={ref}
            className="w-4 h-4" 
            {...props}
        />
        <label className="ml-4 text-slate-800 dark:text-slate-300" htmlFor={name} >{label}</label>
        </div>
    )
})

export default Checkbox