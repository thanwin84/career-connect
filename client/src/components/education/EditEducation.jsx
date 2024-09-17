import { useUpdateEducationRecord } from '../../api/UserApi'
import { useProfileContext } from '../../pages/Profile'
import {
    ModalContainer
} from '../ui'
import {
    EducationForm,
    DeleteEducationRecord
} from './index'

export default function EditEducation({
    record
}){
    
    const {
        toggleEditEducationModal,
        selectedEducationRecord
    } = useProfileContext()
    const {
        isSuccess,
        isPending,
        updateEducationRecord
    } = useUpdateEducationRecord()
    
    return (
        <ModalContainer
            modelClassName= ""
            className="lg:w-3/6 w-5/6 dark:bg-zinc-900 bg-white my-6 rounded-md"
        >
            <EducationForm 
                title = "Edit Education"
                record={selectedEducationRecord}
                isSuccess={isSuccess}
                isPending={isPending}
                closeModal={toggleEditEducationModal}
                onSave={updateEducationRecord}
                submitButtonText="Save Changes"
            />
            <DeleteEducationRecord
                toggleModal={toggleEditEducationModal}
            />
        </ModalContainer>
    )
}