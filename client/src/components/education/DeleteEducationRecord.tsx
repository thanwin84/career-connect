import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useFormStatus} from 'react-dom'
import { deleteEducationRecord } from "../../API";


export default function DeleteEducationRecord({
    recordId,
    toggleModal,
    refetch
}){
    const navigate = useNavigate()
    const {pending} = useFormStatus()
    
    async function action(){
        try {
            await deleteEducationRecord(recordId)
            toggleModal()
            refetch()
            navigate("/dashboard/profile")
            toast.success("Successfully deleted education record", {autoClose: 400})
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    }
    return (
        <form action={action}>
            <div className="w-full  text-center">
                <button
                type="submit"
                 className="mb-4 text-sm font-semibold bg-slate-50 dark:bg-transparent dark:text-slate-300 px-4 py-2 hover:text-red-500 dark:hover:text-red-500"
                >
                    {pending ? "Deleting...": "Delete this entry"}
                </button>
            </div>
        </form>
    )
}

