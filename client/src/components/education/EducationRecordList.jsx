import React from "react";
import { useDashboardContext } from "../../pages/DashboardLayout";
import EducationInfo from "./EducationInfo";


export default function EducationRecordList({className}){
    const {user} = useDashboardContext()

    return (
        <div className={`px-6 py-4 ${className}`}>
            {user.educationRecords.map((record, index)=> (
                    <EducationInfo 
                     key={record._id} 
                     {...record} 
                     className= {`${user.educationRecords.length - 1 != index ? "border-b border-slate-300": ""}`}
                     />
                ))}
        </div>
    )
}