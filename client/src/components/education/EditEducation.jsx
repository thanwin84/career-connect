import React from "react";
import {
    ModalContainer
} from '../ui'
import {
    EducationForm,
    DeleteEducationRecord
} from './index'
import { updateEducationRecord } from "../../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function EditEducation({
    record,
    closeModal,
    refreshData
}){
    
    const navigate = useNavigate()
    async function editEducationAction(form){
        const ob = Object.fromEntries(form.entries())
        ob.currentlyStudying = ob.currentlyStudying === "on" ? true: false
        
        try {
            await updateEducationRecord(ob, record._id)
            toast.success("Education record has been updated", {autoClose: 400})
            closeModal("")
            refreshData()
            navigate("/dashboard/profile")

        } catch (error) {
            toast.error(error?.response?.data.message)
        }
       
    }
    return (
        <ModalContainer
            modelClassName= ""
            className="lg:w-3/6 w-5/6 dark:bg-zinc-900 bg-white my-6 rounded-md"
        >
            <EducationForm 
                title = "Edit Education"
                record={record}
                action={editEducationAction}
                handleEditModal={closeModal}
            />
            <DeleteEducationRecord
                toggleModal={closeModal}
                recordId={record._id}
                refetch={refreshData}
            />
        </ModalContainer>
    )
}