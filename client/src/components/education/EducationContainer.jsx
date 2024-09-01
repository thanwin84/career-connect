import React from "react";
import ProfileInfo from "../personalInformation/ProfileInfo";
import  {
    ModalContainer
} from '..'
import AddEducation from './AddEducation'
import EducationRecordList from "./EducationRecordList";
import { useProfileContext } from "../../pages/Profile";
import { GraduationCapIcon } from "../../utils/Icons";


export default function EducationContainer({
    className,
    user,
    refetch
}){
    const {
        addEducationModal,
        toggleAddEducationModal
    } = useProfileContext()

    return (
        <section className={`bg-white dark:bg-zinc-900 w-full rounded-md shadow-md py-4 ${className}`}>
            <div className="px-6 py-2 flex justify-between">
                <ProfileInfo 
                    icon={<GraduationCapIcon />} 
                    text="Education" 
                    iconClass= "text-2xl text-slate-800 dark:text-slate-300"
                    textClass= "text-xl font-bold ml-2"
                />
                <button
                    className="text-blue-600 hover:underline"
                    onClick={toggleAddEducationModal}
                >
                + Add Education
                </button>
                </div>
                <EducationRecordList user={user} />
                {addEducationModal && (
                    <ModalContainer className="lg:w-3/6 w-5/6">
                        <AddEducation refetch={refetch} /> 
                    </ModalContainer>
                )}
        </section>
    )
}

