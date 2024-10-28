import React, {useEffect, useState} from "react";
import {
    Button
} from "../ui"
import {useForm} from 'react-hook-form'
import FormError from "../ui/FormError";

export default function DescribeYourself({classname, next, goBack, setUser}){
    const options = [
        {text: "I'm a recruiter", value: "recruiter"},
        {text: "I'm a job seeker", value: "user"}
    ]
    const [whoAmI, setWhoAmI] = useState("")
    const canSubmit = whoAmI !== ""
    const {setValue, register, handleSubmit, trigger, formState} = useForm()
    
    async function action(){
        setUser({userType: whoAmI})
        setValue("userType", whoAmI)
        trigger('userType')
        next()
    }
    function handleBack(){
        goBack()
    }
    function handleClick(value){
        setWhoAmI(value)
        setValue('userType', value)
        trigger('userType')
    }
    useEffect(()=>{
        register('userType', {required: "Please select an option"})
    },[])
    return (
        <form onSubmit={handleSubmit(action)} className={`w-full h-screen ${classname}`}>
            <h2 className="text-xl dark:text-slate-300 mb-6">What brings to Career Connect?</h2>
            <ul className="mb-1">
                {options.map(({text, value})=>(
                    <li 
                        key={value}
                        onClick={()=>handleClick(value)}
                        className= {`text-xl dark:text-slate-300 p-4 border mb-4 cursor-pointer ${value=== whoAmI ? "border-2 border-blue-500": ""}`}
                    >
                        {text}
                    </li>
                ))}
            </ul>
            {formState.errors.userType?.message && <FormError className="ml-2 text-base" message={formState.errors.userType?.message} />}
            <div className="flex justify-between gap-4 mt-2">
                <Button 
                    type="button" 
                    classname="w-24"
                    onClick={handleBack}
                    category="normal"
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={!canSubmit}
                    classname= "w-24"
                    category= {canSubmit ? "primary": "normal"}
                >
                    Next
                </Button>
            </div>
        </form>
    )
}