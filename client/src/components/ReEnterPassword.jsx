import React from "react";
import {
    ReEnterPasswordForm
} from "../components"
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTwoStepAuthContext } from "./Setting/TwoStepAuthentication";


export default function ReEnterPassword(){
    const navigate = useNavigate()
    const {handleOpenModal, moveToNextModal} = useTwoStepAuthContext()

    async function action(formData){
        const ob = Object.fromEntries(formData.entries())
        try {
            await customFetch.post("/auth/re-enter-password", ob)
            await customFetch.patch("/auth/toggle-two-step-authentication")
            // close the modal
            handleOpenModal()
            moveToNextModal(true)
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