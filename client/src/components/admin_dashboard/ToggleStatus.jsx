import React, { useState } from "react";
import {
    TurnOff,
    TurnOn
} from "../../components"
import customFetch from "../../utils/customFetch";
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
        <form action={action}>
                <button
                    type="submit"
                >
                    {accessStatus ? <TurnOn/>: <TurnOff/>}
                </button>
        </form>
    )
}

