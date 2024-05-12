import React from "react";
import { Input } from "../components";
import {
    Logo,
    Button
} from "../components";
import {Link} from 'react-router-dom'

export default function Register(){
    return (
        <main className=" bg-stone-50 dark:bg-slate-900 py-8">
            <div className="bg-white p-8 w-4/6 lg:w-2/5 shadow-lg rounded-md mx-auto border-t-4 border-blue-500 dark:bg-slate-800">
                <form action="w-full">
                    <Logo className="mx-auto mb-4"/>
                    <h2 className="text-center text-xl  text-blue-500 font-semibold dark:text-slate-100">Register</h2>
                    <Input  
                        label="First Name"
                        placeholder= "Enter your first Name"
                        name = "firstName"
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
                    <Input 
                        type="password"
                        label="Password"
                        placeholder= "Enter your password"
                        name = "password"
                        className="mb-4"
                        required
                    />
                    <Button type="submit">
                        Submit
                    </Button>
                    <p className="text-center mt-2 dark:text-slate-200">Already a member? <Link to="/login" className="text-blue-500 hover:text-blue-700 hover:underline">Login</Link></p>
                </form>
            </div>
        </main>
    )
}