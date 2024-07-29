import React from "react";
import { Input } from "..";
import {
    Password,
    SubmitForm
} from "..";
import customFetch from '../../utils/customFetch'
import {toast} from 'react-toastify'


export default function CreateAccount({next, setUser}){

    async function action(formData){
        const data = Object.fromEntries(formData.entries())
        setUser(data)
        next()
        
    }

    return (
        <div className="w-full   dark:bg-zinc-900   rounded-md mx-auto">
                <form action={action} >
                    <h2 className="text-xl  text-blue-500 font-semibold dark:text-slate-100 py-4">Create your account</h2>
                    <Input  
                        label="First Name"
                        placeholder= "Enter your first Name"
                        name = "name"
                        className="mb-2"
                        required
                    />
                    <Input  
                        label="Last Name"
                        placeholder= "Enter your last name"
                        name = "lastName"
                        className="mb-2"
                        required
                    />
                    <Input  
                        label="Location"
                        placeholder= "Enter your location"
                        name = "location"
                        className="mb-2"
                    />
                    <Input  
                        type="email"
                        label="Email"
                        placeholder= "Enter your email"
                        name = "email"
                        className="mb-2"
                        required
                    />
                    <Password />
                    <SubmitForm 
                        buttonText={{default: "Next", pending: "Submitting..."}}
                        className= "w-24 item"
                    />
                    
                </form>
            </div>
    )
}