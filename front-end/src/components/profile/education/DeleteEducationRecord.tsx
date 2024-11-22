import { useEffect } from "react";
import { useDeleteEducationRecord } from "../../../api/UserApi";
import { useAppContext } from "../../../contexts/AppProvider";
import { Button } from "../../ui";
import { useForm } from "react-hook-form";

type Props = {
    closeModal: ()=> void
    className?: string
}

export default function DeleteEducationRecord({
    closeModal,
    className
}:Props){
    const {
        isPending, 
        deleteEducationRecord, 
        isSuccess} = useDeleteEducationRecord()
    const {
        profileStore: {state:profileState}, 
        userStore: {actions:userActions}
    } = useAppContext()
    let id = ""
    const educationRecord =  profileState.selectedEducationRecord
    if (educationRecord){
        const {_id} = educationRecord
        id = _id
    }
    const {handleSubmit} = useForm()
    
    useEffect(()=>{
        if (isSuccess){
            closeModal()
            userActions.deleteEducationRecord(id)
        }
    },[isSuccess])

    
    return (
        <form className="" onSubmit={handleSubmit(deleteEducationRecord)} >
            <Button
                category="lightDanger"
                type="submit"
                loading={isPending}
                classname={`mb-4 text-sm mx-auto px-6 ${className}`}
            >
                Delete
            </Button>
        </form>
    )
}

