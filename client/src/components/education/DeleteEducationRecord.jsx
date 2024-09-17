import { useDeleteEducationRecord } from "../../api/UserApi";
import { Button } from "../ui";


export default function DeleteEducationRecord({
    closeModal
}){
    const {
        isPending, 
        deleteEducationRecord, 
        isSuccess} = useDeleteEducationRecord()
    if (isSuccess){
        closeModal()
    }
    
    return (
        <form  onSubmit={deleteEducationRecord} className="flex">
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

