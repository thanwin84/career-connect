import React, { createContext, useContext, useState } from "react";
import {
    TurnOn,
    TurnOff,
    ModalContainer,
    EnterConfirmationCode,
    ReEnterPassword,
    CloseModal,
    AddPhoneNumber,
    SelectCountry
} from '../../components'
import { useOutletContext } from "react-router-dom";

const twoStepAuthenticationContext = createContext()

export default function TwoStepAuthentication(){
    const [openModal, setOpenModal] = useState(false)
    const [openCountryModal, setOpenCountryModal] = useState(false)
    const [currentModal, setCurrentModal] = useState(0)
    const [selectedCountry, setSelectedCountry] = useState({name: "Bangladesh", code: "+88"})
    const {userData} = useOutletContext()
    const [user, setUser] = useState(userData)


    function handleSelectCountry(item){
        setSelectedCountry(item)
    }

    function handleOpenModal(){
        setOpenModal(!openModal)
    }

    function handleCountryModal(){
        setOpenCountryModal(!openCountryModal)
    }

    function moveToNextModal(last){
        setCurrentModal(prev=> last ? 0: prev + 1)
    }
    
    const modals = [<EnterConfirmationCode/>, <ReEnterPassword/>]
    const modalsForAbsencePhoneNumber = [<AddPhoneNumber/>, <EnterConfirmationCode/>, <ReEnterPassword/>]
    return (
        <twoStepAuthenticationContext.Provider value={{
            handleOpenModal,
            moveToNextModal,
            handleCountryModal,
            openCountryModal,
            selectedCountry,
            user,
            setUser
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
                        {userData.phoneNumber ? modals[currentModal]: 
                        modalsForAbsencePhoneNumber[currentModal]}
                    </CloseModal>
                </ModalContainer>)}

                {/* open modal for change click */}
                {openCountryModal && (<ModalContainer>
                    <SelectCountry 
                        onSelect={handleSelectCountry} 
                        selectedCountry={selectedCountry}
                    />
                </ModalContainer>)} 
            </div>
        </twoStepAuthenticationContext.Provider>
    )
}

export const useTwoStepAuthContext =()=> useContext(twoStepAuthenticationContext)