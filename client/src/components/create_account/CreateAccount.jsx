import React from "react";
import { Button, Input } from "../ui";
import {Password} from "../ui";
import {useForm} from 'react-hook-form'

export default function CreateAccount({next, setUser}){
    async function action(formData){
        setUser(formData)
        next()
        
    }

    const {handleSubmit, formState, register} = useForm()
    return (
        <div className="w-full   dark:bg-zinc-900  bg-white px-6 py-4 rounded-md mx-auto">
            <h2 id="formTitle" className="text-xl text-slate-800 font-semibold dark:text-slate-100 py-4">
                    Create your account
            </h2>
            <form onSubmit={handleSubmit(action)} aria-labelledby="formTitle" >
                <div className="flex flex-col gap-3">
                    <Input  
                        label="First Name"
                        placeholder= "Enter your first Name"
                        aria-required="true"
                        {...register('name', {required: "Name is required"})}
                        errorMessage={formState.errors?.name?.message}
                    />
                    <Input  
                        label="Last Name"
                        placeholder= "Enter your last name"
                        aria-required="true"
                        {...register('lastName', {required: "Last name is required"})}
                        errorMessage={formState.errors?.lastName?.message}
                    />
                    <Input  
                        label="Location"
                        placeholder= "Enter your location"
                        {...register('location', {required: "Location is required"})}
                    />
                    <Input  
                        type="email"
                        label="Email"
                        placeholder= "Enter your email"
                        aria-required="true"
                        {...register("email", {required: "Email is required"})}
                        errorMessage={formState.errors?.email?.message}
                    />
                    <Password 
                        className="mb-4" 
                        
                        errorMessage={formState.errors?.password?.message}
                        aria-required="true"
                        {...register("password",{required: "Password is required"})}
                    />
                    <Button
                        classname="self-end"
                        
                    >
                        Next
                    </Button>
                </div> 
            </form>
            </div>
    )
}