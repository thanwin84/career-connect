import {useEffect, useState} from "react";
import {
    Button
} from "../ui"
import {useForm} from 'react-hook-form'
import FormError from "../ui/FormError";
import {  UserType } from "../../types";

type Props = {
    className?: string
    next: ()=> void
    goBack: ()=> void
    setUser: (valuees: {userType: UserType})=> void
}

export default function DescribeYourself({className, next, goBack, setUser}:Props){
    const options = [
        {text: "I'm a recruiter", value: "recruiter"},
        {text: "I'm a job seeker", value: "user"}
    ]
    const [whoAmI, setWhoAmI] = useState<UserType>(null)
    const canSubmit = whoAmI !== null
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
    function handleClick(value:UserType){
        setWhoAmI(value)
        setValue('userType', value)
        trigger('userType')
    }
    useEffect(()=>{
        register('userType', {required: "Please select an option"})
    },[])
    return (
        <form onSubmit={handleSubmit(action)} className={`w-full h-screen ${className}`}>
            <h2 className="text-xl dark:text-slate-300 mb-6">What brings to Career Connect?</h2>
            <ul className="mb-1">
                {options.map(({text, value})=>(
                    <li 
                        key={value}
                        onClick={()=>handleClick(value as UserType)}
                        className= {`text-xl dark:text-slate-300 p-4 border mb-4 cursor-pointer ${value=== whoAmI ? "border-2 border-blue-500": ""}`}
                    >
                        {text}
                    </li>
                ))}
            </ul>
            {formState.errors.userType?.message && (
                <FormError 
                    className="ml-2 text-base" 
                    message={formState.errors.userType?.message as string} 
                    id="user-type-error"
                />
            )}
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