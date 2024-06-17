import React, { useState } from "react";
import customFetch from "../../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EducationForm from "./EducationForm";
import { useEducationContainerContext } from "./EducationContainer";


export default function AddEducation({}){
    const {handleAddEducationModal} = useEducationContainerContext()
    const navigate = useNavigate()
    
    async function handleAction(form){
        const ob = Object.fromEntries(form.entries())
        ob.currentlyStudying = ob.currentlyStudying === "on" ? true: false
        
        try {
            await customFetch.patch("/users/add-education", ob)
            handleAddEducationModal()
            navigate("/dashboard/profile")
            
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
        
    }
    return (
        <EducationForm  title="Add Education" action={handleAction} />
    )
}