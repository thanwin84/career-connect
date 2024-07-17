import React, {useState} from "react";
import {
    ReEnterPasswordForDelete, 
    ConfirmAccountDelete,
    ModalContainer,
    CloseModal
} from "../../components"
import { useOutletContext } from "react-router-dom";

export default function DeleteAccount({className}){
    const {userData} = useOutletContext()
    const [currentModal, setCurrentModal] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    
    function moveToNextModal(last){
        setCurrentModal(prev =>last ? 0: prev + 1)
    }
    function toggleOpenModal(){
        setOpenModal(!openModal)
        setCurrentModal(0)
    }
    
    
    const modals = [
    <ConfirmAccountDelete 
        userData={userData} 
        moveToNextModal={()=>moveToNextModal(false)} 
    />, 
    <ReEnterPasswordForDelete />
]
    return (
        <div className={`w-full px-2 py-4 dark:border-gray-500 border-gray-300 border-t border-b ${className}`} >
            <p className="font-roboto text-slate-500 dark:text-slate-400">Delete your account and all your information related to your account will be deleted parmanently. Please make sure before deleting your account</p>
            <button
             className="bg-gray-300 px-4 py-2  rounded-md mt-4 text-slate-500 hover:bg-green-500 hover:text-white"
             onClick={toggleOpenModal}
            >
                Delete Account
            </button>
            {openModal && (
                <ModalContainer >
                    <CloseModal handleOpenModal={toggleOpenModal}>
                        {modals[currentModal]}
                    </CloseModal>
                </ModalContainer>
            )}
        </div>
    )
}