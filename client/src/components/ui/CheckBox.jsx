import { forwardRef } from "react"

const Checkbox= forwardRef(({label, name, ...props}, ref)=>{
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