import  {forwardRef} from "react"
const SalaryInput = forwardRef(({className, ...props}, ref)=>{
    return (
        <div className={`flex gap-3 px-4 ${className}`}>
            <span className="dark:text-slate-300 my-auto">Min</span>
            <input
                className="w-full dark:text-slate-200 focus:outline-none border-b-2 border-gray-300 px-2 focus:border-blue-300 dark:focus:border-blue-500 text-center text--700 font-semibold bg-transparent"
                
                autoComplete="off"
                type="number"
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default SalaryInput