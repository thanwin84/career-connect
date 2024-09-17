
import {
    TurnOff,
    TurnOn
} from "../ui"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify";


export default function ToggleStatus({accessStatus, _id, handleToggle}){
    
    async function action(){
        
        try {
            await customFetch.patch(`/users/toggle-access-status/${_id}`)
            handleToggle(_id)
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    }

    return (
        <button
            type="submit"
            onClick={action}
        >
            {accessStatus ? <TurnOn/>: <TurnOff/>}
        </button>
    )
}

