import React, { useState } from "react";
import {useFormStatus} from 'react-dom'
import {
    Input,
    Checkbox,
    SubmitForm
} from '..'
import DateSelector from "./DateSelector";
import { RxCross2 } from "react-icons/rx";
import customFetch from "../../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function AddEducation({handleModalClick}){
    
    const [currentlyStudying, setCurrentlyStudying] = useState(false)
    const navigate = useNavigate()
     
    
    async function handleAction(form){
        const ob = Object.fromEntries(form.entries())
        ob.currentlyStudying = currentlyStudying
        
        try {
            
            await customFetch.patch("/users/add-education", ob)
            handleModalClick()
            navigate("/dashboard/profile")
            
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
        
    }
    return (
        <section className="bg-white dark:bg-zinc-900 px-6 py-6 rounded-md">
           <div className="flex justify-between">
            <h2 className="text-xl mb-2 dark:text-slate-200">Add Education</h2>
            <button
                onClick={handleModalClick}
                className="text-xl dark:text-slate-100 font-bold hover:text-red-600 dark:hover:text-red-600 hover:text-2xl"
            >
                <RxCross2 />
            </button>
           </div>
           <form action={handleAction} className="flex flex-col gap-2 p-4">
                <Input 
                    label="School/College"
                    name="school"
                    placeholder="Which school/College have you studied at?"
                    defaultValue="My School"
                />
                <Input 
                    label="Degree"
                    name="degree"
                    placeholder= "ex:B.E"
                    defaultValue="My degree"
                />
                <Input 
                    label="Department"
                    name="department"
                    placeholder= "ex:Computer Science and Engineering"
                    defaultValue="My department"
                />
                <DateSelector
                    title ="Starting From"
                    monthName="startMonth"
                    yearName= "startYear"
                    defaultMonth= "June"
                    defaultYear= "2022"
                />
                
                <Checkbox 
                    label="Currently studying" 
                    name="currentlyStudying"
                    onChange={e => {
                        setCurrentlyStudying(e.target.checked)
                    }}
                    />
                    
                {
                    !currentlyStudying && (
                        <DateSelector
                            title ="Ending in"
                            monthName="endMonth"
                            yearName= "endYear"
                            defaultMonth= "June"
                            defaultYear= "2022"
                        />
                    )
                }
                <SubmitForm />
           </form>
        </section>
    )
}