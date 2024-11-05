
import {
    TurnOff,
    TurnOn
} from "../ui"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify";

type Props = {
    accessStatus: boolean
    _id: string
    handleToggle: (id:string)=> void
}

export default function ToggleStatus({accessStatus, _id, handleToggle}:Props){
    
    async function action(){
        
        try {
            await customFetch.patch(`/users/toggle-access-status/${_id}`)
            handleToggle(_id)
        } catch (error:any) {
            toast.error(error?.response?.data.message)
        }
    }

    return (
        <button
            type="submit"
            onClick={action}
            aria-label={accessStatus ? "Turn off access status": "turn on access status" }
        >
            {accessStatus ? <TurnOn/>: <TurnOff/>}
        </button>
    )
}

