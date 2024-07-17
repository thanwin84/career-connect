import React from "react";
import {
    ReEnterPasswordForm
} from "../../components"
import { customFetch } from "../../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReEnterPasswordForDelete(){
    const navigate = useNavigate()
    async function action(formData){
        const ob = Object.fromEntries(formData.entries())
        try {
            await customFetch.post("/auth/re-enter-password", ob)
            await customFetch.delete('/auth/delete-account')
            navigate("/login")
            toast.success("Your account has been deleted successfully")
        } catch (error) {
            toast.success(error?.response?.data.message)
        }
    }
    return (
        <ReEnterPasswordForm action={action} />
    )
}