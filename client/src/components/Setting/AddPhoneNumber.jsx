import React from "react";
import {NumberInput, SubmitForm, SelectCountry, ModalContainer} from "../../components"
import { useTwoStepAuthContext } from "./TwoStepAuthentication";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export default function AddPhoneNumber(){
    
    const {
        handleCountryModal, 
        handleOpenModal, 
        selectedCountry,
        moveToNextModal,
        setUser
    } = useTwoStepAuthContext()

    
    function hanldeChangeClick(){
        handleOpenModal()
        handleCountryModal()
    }
    async function action(form){
        const ob = Object.fromEntries(form.entries())
        const formInput = {phoneNumber: selectedCountry.code + ob.phoneNumber}
        try {
            await customFetch.patch("/users/add-phone-number", formInput)
            setUser(prev=> {
                return {...prev, phoneNumber: formInput.phoneNumber}
            })
            moveToNextModal()
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
        
    }
    return (
        <div className="bg-white dark:bg-zinc-900 py-16 px-6 rounded-md">
            <h4 className="mb-2 text-xl dark:text-slate-100">Add Phone Number</h4>
            <p className="mb-4 dark:text-slate-200">You must add your phone number to turn on Two factor authentication.</p>
            <div className="flex justify-between mb-3">
                <span className="dark:text-slate-200">{selectedCountry?.name} ({selectedCountry?.code})</span>
                <button 
                    className="dark:text-blue-500 text-blue-700 hover:underline"
                    onClick={hanldeChangeClick}
                >
                    Change
                </button>
            </div>

            <form action={action}>
                <NumberInput />
                <SubmitForm
                    className="mt-10"
                    buttonText={{
                        default: "Next",
                        pending: "saving..."
                    }}
                />
            </form>
            
        </div>
    )
}