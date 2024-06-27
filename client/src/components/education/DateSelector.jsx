import React, {useEffect, useState} from "react"
import {Select} from '..'

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
]

export default function DateSelector({
    title, 
    monthName, 
    yearName,  
    defaultMonth, 
    defaultYear
}){
    const [years, setYears] = useState([])

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
                    name={monthName}
                    options={months}
                    className="w-1/2"
                    defaultValue={defaultMonth}
                    
                />
                <Select
                    name = {yearName}
                    options={years}
                    className= "w-1/2"
                    defaultValue = {defaultYear}
                />
        </div>
    </div>
    )
}