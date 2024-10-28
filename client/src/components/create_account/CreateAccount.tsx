import React from "react";
import { Input } from "../ui";
import {Password, SubmitForm} from "../ui";
import useForm from '../../hooks/FormCheck/useForm'

export default function CreateAccount({next, setUser}){
    const {errors, register, handleSubmit, isLoading}  = useForm()
    async function action(formData){
        setUser(formData)
        next()
        
    }
    return (
        <div className="w-full   dark:bg-zinc-900  bg-white px-6 py-4 rounded-md mx-auto">
            <form onSubmit={(e)=>handleSubmit(e, action)} >
                <h2 className="text-xl  text-blue-500 font-semibold dark:text-slate-100 py-4">Create your account</h2>
                <Input  
                    label="First Name"
                    placeholder= "Enter your first Name"
                    className="mb-2"
                    {...register("name", [{required: true}, {minLength: 3}])}
                    errorMessage={errors.name}
                />
                <Input  
                    label="Last Name"
                    placeholder= "Enter your last name"
                    className="mb-2"
                    {...register("lastName", [{required: true}, {minLength: 3}])}
                    errorMessage={errors.lastName}
                />
                <Input  
                    label="Location"
                    placeholder= "Enter your location"
                    {...register("location")}
                    className="mb-2"
                />
                <Input  
                    type="email"
                    label="Email"
                    placeholder= "Enter your email"
                    className="mb-2"
                    {...register("email", [{required: true}, {isEmail: true}])}
                    errorMessage={errors.email}
                />
                <Password 
                    className="mb-4" 
                    {...register("password", [{required: true}, {minLength: 8}])}
                    errorMessage={errors.password}
                />
                <div className="flex justify-end">
                    <SubmitForm 
                        isLoading={isLoading}
                        buttonText={{default: "Next", pending: "Submitting..."}}
                        className= "w-24"
                    />
                </div>       
            </form>
            </div>
    )
}