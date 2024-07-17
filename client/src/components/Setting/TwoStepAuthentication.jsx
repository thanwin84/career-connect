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
import useMultiStep from "../../hooks/useMultiStep";


const twoStepAuthenticationContext = createContext()

export default function TwoStepAuthentication(){
    const [openModal, setOpenModal] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState({name: "Bangladesh", code: "+88"})
    const {userData} = useOutletContext()
    const [user, setUser] = useState(userData)

    const {step, next, goTo} = useMultiStep( !user.phoneNumber ? 
        [
            <AddPhoneNumber 
                moveToNextModal={()=>goTo(0)} 
            />
        ] : [
            <EnterConfirmationCode 
                moveToNextModal={()=>next()} 
            />, 
            <ReEnterPassword  
                moveToNextModal={()=>goTo(0)}
            />
        ]
    )
    
    function handleSelectCountry(item){
        setSelectedCountry(item)
    }

    function handleOpenModal(){
        setOpenModal(!openModal)
    }

    
    return (
        <twoStepAuthenticationContext.Provider value={{
            selectedCountry,
            user,
            setUser,
            handleSelectCountry,
            handleOpenModal
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
                    <CloseModal handleOpenModal={handleOpenModal}>
                        {step}
                    </CloseModal>
                </ModalContainer>)}

                
            </div>
        </twoStepAuthenticationContext.Provider>
    )
}

export const useTwoStepAuthContext =()=> useContext(twoStepAuthenticationContext)