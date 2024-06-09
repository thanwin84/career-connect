import React from "react";
import { Input } from "../components";
import {
    Logo,
    Button
} from "../components";
import {
    Link,
    Form,
    useNavigation,
    redirect
} from 'react-router-dom'
import {toast} from 'react-toastify'
import customFetch from "../utils/customFetch";

export const action = async ({request})=>{
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post("/auth/login", data)
        toast.success("Login is successfull", {autoClose: 2000})
        return redirect("/dashboard")
    } catch (error) {
        toast.error(error?.response?.data?.message, {autoClose: 3000})
        return error
    }
}

export default function Login(){
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <main className="h-screen bg-stone-50 dark:bg-slate-900 py-8">
            <div className="bg-white p-8 w-4/6 lg:w-2/5 shadow-lg rounded-md mx-auto border-t-4 border-blue-500 dark:bg-slate-800">
                <Form method="post">
                    <Logo className="mx-auto mb-4"/>
                    <h2 className="text-center text-xl  text-blue-500 dark:text-white font-semibold">Login</h2>
                    
                    <Input  
                        type="email"
                        label="Email"
                        placeholder= "Enter your email"
                        name = "email"
                        className="mb-2"
                        required
                    />
                    <Input 
                        type="password"
                        label="Password"
                        placeholder= "Enter your password"
                        name = "password"
                        className="mb-4"
                        required
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "submitting....": "login"}
                    </Button>
                    <p className="text-center mt-2 dark:text-slate-100">
                        Not a member yet? <Link to="/register" className="text-blue-500 hover:text-blue-700 hover:underline">Register</Link>
                    </p>
                </Form>
            </div>
        </main>
    )
}