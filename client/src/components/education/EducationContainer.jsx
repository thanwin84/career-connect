import React, {useState, createContext, useContext} from "react";
import { FaGraduationCap } from "react-icons/fa"
import ProfileInfo from "../personalInformation/ProfileInfo";
import  {
    ModalContainer
} from '..'
import AddEducation from './AddEducation'
import { useDashboardContext } from "../../pages/DashboardLayout";
import EducationRecordList from "./EducationRecordList";

const educationContainerContext = createContext()

export default function EducationContainer({className}){
    const [addEducationModal, setAddEducationModal] = useState(false)
    const {user} = useDashboardContext()
    
    function handleAddEducationModal(){
        setAddEducationModal(!addEducationModal)
    }

    

    return (
        <section className={`bg-white dark:bg-zinc-900 w-full rounded-md shadow-md py-4 ${className}`}>
            <educationContainerContext.Provider value={{
                handleAddEducationModal, 
                addEducationModal,
            }}>
                <div className="px-6 py-2 flex justify-between">
                    <ProfileInfo 
                        icon={<FaGraduationCap/>} 
                        text="Education" 
                        iconClass= "text-2xl text-slate-800 dark:text-slate-300"
                        textClass= "text-xl font-bold ml-2"
                    />
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={handleAddEducationModal}
                    >
                    + Add Education
                    </button>
                </div>
                <EducationRecordList />
                {addEducationModal && (
                    <ModalContainer className="lg:w-3/6 w-5/6">
                        <AddEducation /> 
                    </ModalContainer>
                )}
            </educationContainerContext.Provider>
        </section>
    )
}

export const useEducationContainerContext = ()=> useContext(educationContainerContext)