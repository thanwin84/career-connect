import {EducationForm} from './'
import { ModalContainer } from "../ui";
import { useAddEducationRecord } from "../../api/UserApi";
import { useProfileContext } from '../../pages/Profile';


export default function AddEducation({
}){
    const {isPending,addEducationRecord, isSuccess} = useAddEducationRecord()
    const {toggleAddEducationModal} = useProfileContext()
    
    return (
        <ModalContainer className="lg:w-3/6 w-5/6 my-6">
            <EducationForm  
                title="Add Education" 
                submitButtonText="Create"
                isPending={isPending}
                isSuccess={isSuccess}
                closeModal={toggleAddEducationModal}
                onSave={addEducationRecord}
            />
        </ModalContainer>
    )
}