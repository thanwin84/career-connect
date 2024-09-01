import React from "react";
import {
    Input,
    Logo,
    Password,
    SubmitForm
} from "../components";
import {
    Link,
    useNavigate
} from 'react-router-dom'
import {toast} from 'react-toastify'
import { useMainContext } from "../contexts/MainContext";
import {login as loginUser} from '../API'


export default function Login(){
    const navigate = useNavigate()
    const {login} = useMainContext()

    async function action (form){
        const formData = Object.fromEntries(form.entries())
        try {
            const data = await loginUser(formData)
            login(data)
            toast.success("Login is successfull", {autoClose: 2000})
            navigate("/home")
        } catch (error) {
            if (error?.response?.data?.message === "Access Denied"){
                toast.error("Sorry, Your are temporarily blocked")
            }
            else {
                toast.error(error?.response?.data?.message, {autoClose: 3000})
            }
        }
    }

    
    return (
        <main className="h-screen bg-stone-50 dark:bg-zinc-900 py-8">
            <div className="bg-white p-8 w-4/6 lg:w-2/5 shadow-lg rounded-md mx-auto border-t-4 border-blue-500 dark:bg-zinc-800">
                <form action={action}>
                    <Logo className="mx-auto mb-4 w-52"/>
                    <h2 className="text-center text-xl  text-blue-500 dark:text-white font-semibold">Login</h2>
                    
                    <Input  
                        type="email"
                        label="Email"
                        placeholder= "Enter your email"
                        name = "email"
                        className="mb-2"
                        required
                    />
                    <Password className="mb-6" />
                    <SubmitForm 
                        buttonText={{pending: "Logging in..", default: "Login"}}
                        className="w-full"
                    />
                    <p className="text-center mt-2 dark:text-slate-100">
                        Not a member yet? <Link to="/register" className="text-blue-500 hover:text-blue-700 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
            
        </main>
    )
}