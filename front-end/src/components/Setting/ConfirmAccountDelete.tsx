import { useState } from "react";
import {Input, Button} from "../ui"
import { User } from "../../types";

type Props = {
    userData: User
    moveToNextModal: ()=> void
}

export default function ConfirmAccountDelete({userData, moveToNextModal}:Props){
    const [typedAccount, setTypedAccount] = useState("")
   
    return (
        <div className="w-full p-8 bg-white dark:bg-zinc-900 rounded-md">
            <h4 className="text-slate-700 dark:text-slate-200 border-b py-2 mb-2 text-xl font-semibold">Delete Account  {userData.name}</h4>
            <p className="text-slate-600 font-semibold mb-2 dark:text-slate-300">To confirm, type {`"${userData.name}"`} in the box below </p>
            <Input
                onChange={e=> setTypedAccount(e.target.value)}
            />
            <Button 
                type="submit"
                category="danger" 
                classname= "mt-4 text-sm"
                disabled={typedAccount !== userData.name}
                onClick={moveToNextModal}
            >
                Delete
            </Button>
        </div>
    )
}