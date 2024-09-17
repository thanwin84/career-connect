import  {useEffect, useState} from "react"
import {Select} from '../ui'
import { useFormContext } from "react-hook-form"

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
]

export default function DateSelector({
    title, 
    monthName, 
    yearName,
}){
    const [years, setYears] = useState([])
    const {register, formState} = useFormContext()
    const {errors} = formState

    useEffect(()=>{
        const yearsArray = []
        const currentYear = new Date().getFullYear()
        for (let year =currentYear; year >= 1950; year--){
            yearsArray.push(year)
        }
        setYears(yearsArray)
    }, [])

    
    return (
        <div className="">
            <p className="mb-2 dark:text-slate-200">{title}</p>
            <div className="flex gap-2">
                <Select
                    {...register(monthName, {required: `Please select a month`})}
                    errorMessage={errors?.[monthName]?.message}
                    options={months}
                    className="w-1/2"

                />
                <Select
                    options={years}
                    className= "w-1/2"
                    {...register(yearName, {required: `Please select a year`})}
                    errorMessage={errors?.[yearName]?.message}
                />
        </div>
    </div>
    )
}