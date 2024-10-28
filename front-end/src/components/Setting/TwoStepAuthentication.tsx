import {  useEffect } from "react";
import { 
    TurnOff,
    TurnOn,
    CloseModal,
    ModalContainer,
    ReEnterPasswordForm
 } from "../ui";
 import {
    EnterConfirmationCode,
    AddPhoneNumber
 } from '../Setting'
import useMultiStep from "../../hooks/useMultiStep";
import { useAppContext } from "../../contexts/AppProvider";
import { useToggleAuthStatus } from "../../api/UserApi";


export default function TwoStepAuthentication({
    
}){
    const {userStore, settingStore} = useAppContext()
    const {user} = userStore.state
    
    const {
        isPending,
        isSuccess,
        updateTwoStepAuthStatus,
        resetState
    } = useToggleAuthStatus()
    

    const {step, next, goTo, reset:resetStep} = useMultiStep( !user?.phoneNumber ? 
        [
            <AddPhoneNumber 
                moveToNextModal={()=>goTo(0)} 
            />
        ] : [
            <EnterConfirmationCode 
                moveToNextModal={()=>next()} 
            />, 
            <ReEnterPasswordForm 
                isPending={isPending}
                action={updateTwoStepAuthStatus}
                title="Re-enter your password"
                description="Please enter your password to turn on two step authentication"
            />
        ]
    )
    useEffect(()=>{
        if (isSuccess){
            settingStore.actions.toggleOpenModal()
            resetState()
            resetStep()
        }
    }, [isSuccess])
    return (
        <div className="w-full">
            <h4 className="text-xl text-slate-600 border-b py-2 dark:text-slate-200">Two Step Authentication</h4>
            <div className="w-full mt-4 flex justify-between border px-4 py-2 rounded-md">
                <span className="dark:text-slate-50">Turn on Two Factor Authentication</span>
                <button
                    onClick={settingStore.actions.toggleOpenModal}
                >
                    {user?.twoStepAuthentication ? <TurnOn/>: <TurnOff/>}
                    
                </button>
            </div>
            {settingStore.state.openModal && (<ModalContainer className="w-5/6 md:w-[60%]">
                <CloseModal 
                    handleOpenModal={settingStore.actions.toggleOpenModal}
                >
                    {step}
                </CloseModal>
            </ModalContainer>)}
        </div>
    )
}
