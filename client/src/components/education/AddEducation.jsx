import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EducationForm from "./EducationForm";
import { addEducationRecord } from "../../API";
import { useProfileContext } from "../../pages/Profile";


export default function AddEducation({}){
    
    const navigate = useNavigate()
    const {
        refetch, 
        toggleAddEducationModal:closeAddEducationModal
    } = useProfileContext()
    
    async function addEducationAction(form){
        const formData = Object.fromEntries(form.entries())
        formData.currentlyStudying = formData.currentlyStudying === "on" ? true: false
        
        try {
            await addEducationRecord(formData)
            refetch()
            closeAddEducationModal()
            navigate("/dashboard/profile")
            toast.success("Education record has been added successfully")
            
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
        
    }
    return (
        <EducationForm  title="Add Education" action={addEducationAction} />
    )
}