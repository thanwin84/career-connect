
import {
    AddEducation,
    EducationRecordList,
    EditEducation
} from './index'
import { useAppContext } from "../../../contexts/AppProvider";
import { Heading } from '../user_information';
import { FaGraduationCap } from 'react-icons/fa';

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
                <Heading
                    icon={<FaGraduationCap/>}
                    content='Education'
                />
                <button
                    className="text-blue-600 hover:underline"
                    onClick={actions.toggleAddEducationModal}
                    aria-label="Click to add Education record"
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

