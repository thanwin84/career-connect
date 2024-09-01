import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {EducationForm} from './'
import ModalContainer from "../ModalContainer";
import { addEducationRecord } from "../../API";


export default function AddEducation({
    closeModal,
    refreshData
}){
    
    const navigate = useNavigate()
    
    async function addEducationAction(form){
        const formData = Object.fromEntries(form.entries())
        formData.currentlyStudying = formData.currentlyStudying === "on" ? true: false
        
        try {
            await addEducationRecord(formData)
            refreshData()
            closeModal()
            navigate("/dashboard/profile")
            toast.success("Education record has been added successfully")
            
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
        
    }
    return (
        <ModalContainer className="lg:w-3/6 w-5/6 my-6">
            <EducationForm  
                title="Add Education" 
                action={addEducationAction} 
            />
        </ModalContainer>
    )
}