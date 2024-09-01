import React from "react";
import { useProfileContext } from "../../pages/Profile";
import { 
    UniversityIcon, 
    EditIcon
 } from "../../utils/Icons";


export default function EducationInfo({
    ...props
}){
    
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
    
    const {refetch, toggleEditEducationModal} = useProfileContext()

    function handleEditModal(){
        toggleEditEducationModal(props)
    }
    
    return (
        <div className={`py-4 flex gap-2 ${className}`}>
        <div className="my-auto text-slate-600 dark:text-slate-300">
            <UniversityIcon size= "1.6rem" />
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
                        <EditIcon />
                    </button>
                </div>
            </div>
            
        </div>
    )
}
