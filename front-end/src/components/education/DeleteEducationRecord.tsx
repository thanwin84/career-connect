import { useEffect } from "react";
import { useDeleteEducationRecord } from "../../api/UserApi";
import { useAppContext } from "../../contexts/AppProvider";
import { Button } from "../ui";
import { Education } from "../../types";
import { useForm } from "react-hook-form";

type Props = {
    closeModal: ()=> void
}

export default function DeleteEducationRecord({
    closeModal
}:Props){
    const {
        isPending, 
        deleteEducationRecord, 
        isSuccess} = useDeleteEducationRecord()
    const {
        profileStore: {state:profileState}, 
        userStore: {actions:userActions}
    } = useAppContext()
    const {_id} = profileState.selectedEducationRecord as Education
    const {handleSubmit} = useForm()
    
    useEffect(()=>{
        if (isSuccess){
            closeModal()
            userActions.deleteEducationRecord(_id)
        }
    },[isSuccess])

    
    return (
        <form  onSubmit={handleSubmit(deleteEducationRecord)} className="flex">
            <Button
                category="lightDanger"
                type="submit"
                loading={isPending}
                classname="mb-4 text-sm mx-auto px-6"
            >
                Delete
            </Button>
        </form>
    )
}

