import React from "react";
import { Input } from "../components";
import {
    Logo,
    Password,
    SubmitForm
} from "../components";
import {
    Link,
    useNavigate
} from 'react-router-dom'
import customFetch from '../utils/customFetch'
import {toast} from 'react-toastify'


export default function Register(){
    const navigate = useNavigate()

    async function action(formData){
        const data = Object.fromEntries(formData.entries())
        try {
            await customFetch.post("/auth/register", data)
            toast.success("Registration is successfull", {autoClose: 3000})
            navigate("/login")
        } catch (error) {
            toast.error(error?.response?.data?.message, {autoClose: 3000})
        }
       
    }

    return (
        <main className=" bg-stone-50 dark:bg-zinc-900 py-8">
            <div className="bg-white dark:bg-zinc-800 p-8 w-4/6 lg:w-2/5 shadow-lg rounded-md mx-auto border-t-4 border-blue-500 ">
                <form action={action} >
                    <Logo className="mx-auto mb-4 w-4/6"/>
                    <h2 className="text-center text-xl  text-blue-500 font-semibold dark:text-slate-100">Register</h2>
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
                        buttonText={{default: "Submit", pending: "Submitting..."}} 
                    />
                    <p className="text-center mt-2 dark:text-slate-200">Already a member? <Link to="/login" className="text-blue-500 hover:text-blue-700 hover:underline">Login</Link></p>
                </form>
            </div>
        </main>
    )
}