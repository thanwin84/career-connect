import React, { useEffect, useState } from "react";
import {Button, Input, SubmitForm} from "../../components"
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { useTwoStepAuthContext } from "./TwoStepAuthentication";

export default function EnterConfirmationCode(){
    const {handleCurrentModal} = useTwoStepAuthContext()
    const {userData} = useOutletContext()
    const [sendCode, setSendCode] = useState(false)
    const [code, setCode] = useState("")
    const moveNext = code !== ""

    async function handleNextAction(formData){
        const ob = Object.fromEntries(formData.entries())
        
        try {
            await customFetch.post("/auth/verify-code", {
                phoneNumber: "+" + userData?.phoneNumber.substr(2),
                code: ob.code
            })
            handleCurrentModal()
            
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    }

    async function sendCodeAction(){
        try {
            await customFetch.post("/auth/send-verification-code", 
                {
                    phoneNumber: "+" + userData?.phoneNumber.substr(2), 
                    channel: "sms"}
            )
            toast.success("Verification code has been sent")
            setSendCode(true)
        } catch (error) {
            toast.error(error?.response?.data.message)
            
        }
    }
    

    return (
        <div className="p-10  bg-white rounded dark:bg-zinc-900">
         <h4 className="text-xl font-semibold mb-2 dark:text-slate-100">Enter Confirmation Code</h4>
         <p className="mb-2 dark:text-slate-200">
            {sendCode ? `A 6-digit code has been sent to +**********${userData?.phoneNumber.substr(-3) || ""}`: "Click send code button to get a code"}
        </p>
         <p className="mb-4 dark:text-slate-200">It may take up to a minute for you to receive this code</p>
         <form action={handleNextAction}>
            <Input
                name="code"
                placeholder="Enter code"
                className="mb-4"
                onChange={(e)=>setCode(e.target.value)}
                autoComplete="off"
            />
            
            <Button
                type="submit"
                classname= {`mt-2 mb-2 ${!moveNext ? "cursor-not-allowed":""}`}
                disabled={!moveNext}
            >
                Next
            </Button>
         </form>
         <form action={sendCodeAction} className="mt-2">
                <SubmitForm 
                    buttonText={
                        {
                            pending: "Sending...", 
                            default: sendCode ? "Resend Code": "Send code"}
                    } 
                />
         </form>
        </div>
    )
}