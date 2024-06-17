import React, {useState} from "react";
import { MdEdit } from "react-icons/md";
import { FaUniversity } from "react-icons/fa"
import {ModalContainer} from '..'
import EducationForm from "./EducationForm";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteEducationRecord from "./DeleteEducationRecord";


export default function EducationInfo({
    ...props
}){
    
    const navigate = useNavigate()
    const {
        className, 
        school, 
        department, 
        degree, 
        startMonth, 
        startYear, 
        endMonth, 
        endYear, 
        currentlyStudying,
        _id
    } = props
    
    const [editModal, setEditModal] = useState(false)
    function handleEditModal(){
        setEditModal(!editModal)
    }
    async function action(form){
        const ob = Object.fromEntries(form.entries())
        ob.currentlyStudying = ob.currentlyStudying === "on" ? true: false
        try {
            await customFetch.patch(`/users/education/${_id}/update-record`, ob)
            toast.success("Education record has been updated", {autoClose: 400})
            handleEditModal()
            navigate("/dashboard/profile")

        } catch (error) {
            toast.error(error?.response?.data.message)
        }
       
    }
    return (
        <div className={`py-4 flex gap-2 ${className}`}>
        <div className="my-auto text-slate-600 dark:text-slate-300">
            <FaUniversity size= "1.4rem" />
        </div>
            <div className="w-full">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">{school}</h4>
                <div className="w-full flex justify-between">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        <span >{department}</span>
                        <span className="font-bold dark:text-slate-200"> . </span>
                        <span >{degree}</span>
                        <span className="font-bold dark:text-slate-200"> . </span>
                        <span >{startMonth} {startYear}</span>
                        <span className="font-bold"> - </span>
                        <span >{currentlyStudying ? "present": `${endMonth} ${endYear}`}</span>
                    </p>
                    
                    <button
                        className="text-slate-700 dark:text-slate-300 dark:hover:text-blue-500"
                        onClick={handleEditModal}
                    >
                        <MdEdit />
                    </button>
                </div>
            </div>
            {editModal && (
                <ModalContainer className="lg:w-3/6 w-5/6 dark:bg-zinc-900 bg-white">
                    {/* Edit Education form */}
                    <EducationForm 
                        title = "Edit Education"
                        record={props}
                        action={action}
                        handleEditModal={handleEditModal}
                    />
                    <DeleteEducationRecord recordId={_id}/>
                </ModalContainer>
            )}
        </div>
    )
}