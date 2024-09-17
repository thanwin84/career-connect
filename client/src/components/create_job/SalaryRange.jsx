import { useFormContext } from "react-hook-form";
import {SalaryInput} from './'

export default function SalaryRange({
    className
}){
    const {register} = useFormContext()
    
    return (
        <div className={`w-full ${className}`} >
           <span  className="block mb-4  text-slate-600 dark:text-slate-200">Salary Range</span>
            <div className="flex gap-4 mt-2 px-4">
                <SalaryInput 
                    className=""
                    {...register(`salary.min`)}
                    // defaultValue={values.salary.min}
                    
                />
                <span className="font-medium">-</span>
                <div className="flex gap-2">
                    <SalaryInput 
                        className="" 
                        {...register('salary.max')}
                    />
                </div>
            </div>
        </div>
    )
}

