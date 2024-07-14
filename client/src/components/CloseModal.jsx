import { RxCross2 } from "react-icons/rx";
import React from "react";
import { useTwoStepAuthContext } from "./Setting/TwoStepAuthentication";


export default function CloseModal({children}){
    const {handleOpenModal} = useTwoStepAuthContext()
    return (
        <div>
           <span className="pb-6 flex justify-end">
            <button onClick={handleOpenModal}>
                <RxCross2 className="text-2xl hover:text-red-500 text-slate-800 dark:text-slate-200 dark:hover:text-red-600"/>
            </button>
           </span>
           {children}
        </div>
    )
}