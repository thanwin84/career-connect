import { useEffect, useState } from 'react'
import { useUpdateEducationRecord } from '../../../api/UserApi'
import { useAppContext } from '../../../contexts/AppProvider'
import { Education, FormData } from '../../../types'

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
        <div className='relative'>
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
                className='absolute bottom-6 left-8'
                closeModal={actions.toggleEditEducationModal}
            />
        </div>
    )
}