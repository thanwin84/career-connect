import React, { createContext, useContext, useState } from "react";
import {
    TurnOn,
    TurnOff,
    ModalContainer,
    EnterConfirmationCode,
    ReEnterPassword,
    CloseModal,
    AddPhoneNumber
} from '../../components'
import { useOutletContext } from "react-router-dom";

const twoStepAuthenticationContext = createContext()

export default function TwoStepAuthentication(){
    const [openModal, setOpenModal] = useState(false)
    const [currentModal, setCurrentModal] = useState(0)
    const {userData} = useOutletContext()

    function handleOpenModal(){
        setOpenModal(!openModal)
    }

    function handleCurrentModal(last){
        setCurrentModal(prev=> last ? 0: prev + 1)
    }
    
    const modals = [<EnterConfirmationCode/>, <ReEnterPassword/>]
    return (
        <twoStepAuthenticationContext.Provider value={{
            handleOpenModal,
            handleCurrentModal
        }}>
            <div className="w-full">
                <h4 className="text-xl text-slate-600 border-b py-2 dark:text-slate-200">Two Step Authentication</h4>
                <div className="w-full mt-4 flex justify-between border px-4 py-2 rounded-md">
                    <span className="dark:text-slate-50">Turn on Two Factor Authentication</span>
                    <button
                        onClick={handleOpenModal}
                    >
                        {userData.twoStepAuthentication ? <TurnOn/>: <TurnOff/>}
                        
                    </button>
                </div>
                {openModal && (<ModalContainer>
                    <CloseModal>
                        {modals[currentModal]}
                        
                    </CloseModal>
                </ModalContainer>)}
            </div>
        </twoStepAuthenticationContext.Provider>
    )
}

export const useTwoStepAuthContext =()=> useContext(twoStepAuthenticationContext)