import  {useState} from "react";
import {
    ReEnterPasswordForDelete,
    ConfirmAccountDelete
} from '../Setting'
import { ModalContainer, CloseModal } from "../ui";
import useMultiStep from "../../hooks/useMultiStep";
import { useAppContext } from "../../contexts/AppProvider";
import { User } from "../../types";

type Props = {
    className?: string
}

export default function DeleteAccount({
    className
}:Props){
    const {userStore: {state:userState}} = useAppContext()
    
    const {step, next, goTo} = useMultiStep([
        <ConfirmAccountDelete 
            userData={userState.user as User}
            moveToNextModal={()=>next()}
        />, 
        <ReEnterPasswordForDelete />
    ])
    const [openModal, setOpenModal] = useState(false)

    function toggleOpenModal(){
        setOpenModal(!openModal)
        goTo(0)
    }
     
    return (
        <div className={`w-full px-2 py-4 dark:border-gray-500 border-gray-300 border-t border-b ${className}`} >
            <h2 className="text-xl font-bold text-slate-700 pb-2 dark:text-slate-200">Delete Account</h2>
            <p className="font-roboto text-slate-500 dark:text-slate-400">Delete your account and all your information related to your account will be deleted parmanently. Please make sure before deleting your account</p>
            <button
                className="bg-gray-300 px-4 py-2  rounded-md mt-4 text-slate-500 hover:bg-green-500 hover:text-white"
                onClick={toggleOpenModal}
            >
                Delete Account
            </button>
            {openModal && (
                <ModalContainer className="p-6 lg:w-4/6">
                    <CloseModal handleOpenModal={toggleOpenModal}>
                        {step}
                    </CloseModal>
                </ModalContainer>
            )}
        </div>
    )
}