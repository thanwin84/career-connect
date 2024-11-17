import { useEffect, useState } from 'react'
import { useUpdateEducationRecord } from '../../../api/UserApi'
import { useAppContext } from '../../../contexts/AppProvider'
import { Education, FormData } from '../../../types'
import {
    ModalContainer
} from '../../ui'
import {
    EducationForm,
    DeleteEducationRecord
} from './index'


export default function EditEducation(){
    
    const {profileStore:{actions, state}, userStore: {actions:userActions}} = useAppContext()
    const [updatedEducation, setUpdatedEducation] = useState<Education>()
    const {
        isSuccess,
        isPending,
        updateEducationRecord
    } = useUpdateEducationRecord()

    useEffect(()=>{
        if (isSuccess && updatedEducation){
            userActions.updateEducationRecord(updatedEducation, updatedEducation._id)
            actions.toggleEditEducationModal()
           
        }
    },[isSuccess, updatedEducation])

    function handleOnsave(formData:FormData){
        updateEducationRecord(formData)
        setUpdatedEducation(formData as Education)
    }
    
    return (
        <ModalContainer
            titleId='edit-education-id'
            className="lg:w-3/6 w-5/6 dark:bg-zinc-900 bg-white my-6 rounded-md"
        >
            <EducationForm 
                title = "Edit Education"
                record={state.selectedEducationRecord as Education}
                isPending={isPending}
                closeModal={actions.toggleEditEducationModal}
                onSave={handleOnsave}
                submitButtonText="Save Changes"
                id='edit-education-id'
            />
            <DeleteEducationRecord
                closeModal={actions.toggleEditEducationModal}
            />
        </ModalContainer>
    )
}