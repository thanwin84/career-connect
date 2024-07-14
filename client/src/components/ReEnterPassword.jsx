import React from "react";
import {
    Input, SubmitForm
} from "../components"
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTwoStepAuthContext } from "./Setting/TwoStepAuthentication";


export default function ReEnterPassword(){
    const navigate = useNavigate()
    const {handleOpenModal, handleCurrentModal} = useTwoStepAuthContext()

    async function action(formData){
        const ob = Object.fromEntries(formData.entries())
        try {
            await customFetch.post("/auth/re-enter-password", ob)
            await customFetch.patch("/auth/toggle-two-step-authentication")
            // close the modal
            handleOpenModal()
            handleCurrentModal(true)
            // turn on two factor authentication
            navigate("/dashboard/setting/password-and-security")
        } catch (error) {
            toast.error(error?.response?.data.message)
            
        }
    }
    return (
        <div className="w-full  p-10 bg-white dark:bg-zinc-900 flex items-center rounded-md">
            <div className="mx-auto">
            <h4 className="text-xl mb-2 font-semibold dark:text-slate-100">Please re-enter your password</h4>
            <p className="mb-2 dark:text-slate-200 text-slate-800">For your security, you must re-enter your password to continue</p>
            <form action={action} className="flex flex-col justify-between h-full">
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="mb-20"
                    required
                />
                <SubmitForm 
                    buttonText={{pending: "verifying...", default: "Submit"}}
                />
            </form>
            </div>
        </div>
    )
}