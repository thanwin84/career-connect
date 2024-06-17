import React, {useState} from "react";
import { FaGraduationCap } from "react-icons/fa"
import ProfileInfo from "../ProfileInfo";
import  {
    ModalContainer
} from '..'
import AddEducation from './AddEducation'
import EducationInfo from "./EducationInfo";
import { useDashboardContext } from "../../pages/DashboardLayout";

export default function Education({className}){
    const [openModal, setOpenModal] = useState(false)
    const {user} = useDashboardContext()
    
    function handleModalClick(){
        setOpenModal(!openModal)
    }

    return (
        <section className={`bg-white dark:bg-zinc-900 w-full rounded-md shadow-md py-4 ${className}`}>
            <div className="px-6 py-2 flex justify-between">
                <ProfileInfo 
                    icon={<FaGraduationCap/>} 
                    text="Education" 
                    iconClass= "text-2xl text-slate-800 dark:text-slate-300"
                    textClass= "text-xl font-bold ml-2"
                />
                <button
                    className="text-blue-600 hover:underline"
                    onClick={handleModalClick}
                >
                 + Add Education
                </button>
            </div>
            <div className="px-6">
                {user.educationRecords.map((record, index)=> (
                    <EducationInfo 
                     key={record._id} 
                     {...record} 
                     className= {`${user.educationRecords.length - 1 != index ? "border-b border-slate-300": ""}`}
                     />
                ))}
            </div>
            {openModal && (
                <ModalContainer className="lg:w-3/6 w-5/6">
                <AddEducation handleModalClick={handleModalClick}/>
            </ModalContainer>
            )}
        </section>
    )
}