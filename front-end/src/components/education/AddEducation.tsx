import {EducationForm} from './'
import { ModalContainer } from "../ui";
import { useAddEducationRecord } from "../../api/UserApi";
import { useAppContext } from '../../contexts/AppProvider';
import { Education, FormData } from '../../types';
import { useEffect, useState } from 'react';
import ObjectId from 'bson-objectid';

export default function AddEducation({
}){
    const {isPending,addEducationRecord, isSuccess} = useAddEducationRecord()
    const {profileStore:{state, actions}, userStore: {actions:userActions}} = useAppContext()
    const [record, setRecord] = useState<Education>()

    useEffect(()=>{
        if (isSuccess && record){
            userActions.addEducationRecord(record)
            actions.toggleAddEducationModal()
            
        }
    },[isSuccess])

    function handleOnSave(formData:FormData){
        const id = new ObjectId().toString()
        const newRecord = {_id: id, ...formData} as Education
        addEducationRecord(newRecord)
        setRecord(newRecord)

    }
    return (
        <ModalContainer 
            className="lg:w-3/6 w-5/6 my-6"
            titleId='add education'
        >
            <EducationForm  
                title="Add Education" 
                submitButtonText="Create"
                isPending={isPending}
                closeModal={actions.toggleAddEducationModal}
                onSave={handleOnSave}
                record={state.selectedEducationRecord as Education}
            />
        </ModalContainer>
    )
}