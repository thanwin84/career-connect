import React from "react";
import {
    ReEnterPasswordForm
} from "../ui"
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTwoStepAuthContext } from "../Setting/TwoStepAuthentication";



export default function ReEnterPassword({moveToNextModal}){
    const navigate = useNavigate()
    const {handleOpenModal} = useTwoStepAuthContext()
    

    async function action(formData){
        const ob = Object.fromEntries(formData.entries())
        try {
            await customFetch.post("/auth/re-enter-password", ob)
            await customFetch.patch("/auth/toggle-two-step-authentication")
            moveToNextModal()
            handleOpenModal()
            // turn on two factor authentication
            navigate("/dashboard/setting/password-and-security")
        } catch (error) {
            toast.error(error?.response?.data.message)
            
        }
    }
    return (
        <ReEnterPasswordForm action={action} />
    )
}