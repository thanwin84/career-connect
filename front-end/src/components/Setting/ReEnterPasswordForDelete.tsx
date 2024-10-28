
import { useEffect } from "react";
import { useDeleteAccount, useVerifyPassword } from "../../api/UserApi";
import {
    ReEnterPasswordForm
} from "../ui"


export default function ReEnterPasswordForDelete(){
    const {deleteAccount, isPending:deletePending} = useDeleteAccount()
    const {verifyPassword, isPending:verifyPending, isSuccess} = useVerifyPassword()

    useEffect(()=>{
        if (isSuccess){
            deleteAccount({})
        }
    },[isSuccess])
    
    return (
        <ReEnterPasswordForm
            title="Re-enter your password"
            description="You must re-enter your password to delete your account."
            action={verifyPassword}
            isPending={deletePending || verifyPending}
         />
    )
}