import React, { useState } from "react";
import {Input, Button} from ".."
import {useFormStatus} from "react-dom"


export default function ConfirmAccountDelete({userData, moveToNextModal}){
    const [typedAccount, setTypedAccount] = useState("")
    const {pending} = useFormStatus()

    return (
        <div className="w-full p-8 bg-white dark:bg-zinc-900 rounded-md">
            <h4 className="dark:text-slate-200 border-b py-2 mb-2">Delete Account  {userData.name}</h4>
            <p className="font-semibold mb-2 dark:text-slate-300">To confirm, type {`"${userData.name}"`} in the box below </p>
            <Input
                onChange={e=> setTypedAccount(e.target.value)}
            />
            <Button 
                type="submit"
                category="danger" 
                classname= "mt-4"
                disabled={typedAccount !== userData.name}
                onClick={moveToNextModal}
            >
                {pending ? "Deleting...": "Delete this Account"}
            </Button>
        </div>
    )
}