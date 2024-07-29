import React, {useState} from "react";
import {
    Button,
    SubmitForm
} from "../../components"
import { customFetch } from "../../utils";
import { toast } from "react-toastify";

export default function DescribeYourself({classname, next, goBack, setUser}){
    const options = [
        {text: "I'm a recruiter", value: "recruiter"},
        {text: "I'm a job seeker", value: "user"}
    ]
    const [whoAmI, setWhoAmI] = useState("")
    const canSubmit = whoAmI !== ""
    
    async function action(){
        setUser({userType: whoAmI})
        next()
    }
    function handleBack(){
        goBack()
    }
    return (
        <form action={action} className={`w-full h-screen ${classname}`}>
            <h2 className="text-xl dark:text-slate-300 mb-6">What brings to Career Connect?</h2>
            <ul className="mb-8">
                {options.map(({text, value})=>(
                    <li 
                        key={value}
                        onClick={()=>setWhoAmI(value)}
                        className= {`text-xl dark:text-slate-300 p-4 border mb-4 cursor-pointer ${value=== whoAmI ? "border-2 border-blue-500": ""}`}
                    >
                        {text}
                    </li>
                ))}
            </ul>
            <div className="flex justify-between gap-4">
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