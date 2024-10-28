import ProfileInfo from "../user_information/ProfileInfo";
import {
    AddEducation,
    EducationRecordList,
    EditEducation
} from './index'
import { GraduationCapIcon } from "../../utils/Icons";
import { useAppContext } from "../../contexts/AppProvider";

type Props = {
    className?: string
}
 
export default function EducationContainer({
    className
}:Props){
    
    const {profileStore: {state, actions}} = useAppContext()
    
    
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
                    onClick={actions.toggleAddEducationModal}
                >
                    + Add Education
                </button>
                </div>
                <EducationRecordList />
                {/* adding education modal */}
                {state.addEducationModal && <AddEducation />}
                {/* Edit education modal */}
                {state.editEducationModal && (
                    <EditEducation />
                )}
        </section>
    )
}

