import React from "react";
import { Input } from "../components";
import {
    Logo,
    Button
} from "../components";
import {Link} from 'react-router-dom'

export default function Login(){
    return (
        <main className="h-screen bg-stone-50 py-8">
            <div className="bg-white p-8 w-4/6 lg:w-2/5 shadow-lg rounded-md mx-auto border-t-4 border-blue-500">
                <form action="w-full">
                    <Logo className="mx-auto mb-4"/>
                    <h2 className="text-center text-xl  text-blue-500 font-semibold">Login</h2>
                    
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
                        Login
                    </Button>
                    <p className="text-center mt-2">
                        Not a member yet? <Link to="/register" className="text-blue-500 hover:text-blue-700 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
        </main>
    )
}