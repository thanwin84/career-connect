import React, { useState } from "react";
import {
    Button, 
    Input, 
    SubmitForm
} from "../../components"
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useTwoStepAuthContext } from "./TwoStepAuthentication";

export default function EnterConfirmationCode(){
    const {moveToNextModal, user} = useTwoStepAuthContext()
    const [sendCode, setSendCode] = useState(false)
    const [code, setCode] = useState("")
    const moveNext = code !== ""
    
    async function handleNextAction(formData){
        const ob = Object.fromEntries(formData.entries())
        try {
            // verify phone number
            const {data} = await customFetch.post("/auth/verify-code", {
                phoneNumber:user?.phoneNumber,
                code: ob.code
            })
        
            if (data.data === "approved"){
                moveToNextModal(true)
            }
            else {
                toast.error("Your code does not match")
            }
            
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    }

    async function sendCodeAction(){
        
        try {
            await customFetch.post("/auth/send-verification-code", 
                {
                    phoneNumber: user?.phoneNumber, 
                    channel: "sms"
                }
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
            {sendCode ? `A 6-digit code has been sent to +**********${user?.phoneNumber.substr(-3) || ""}`: 
              <>Click <span className="text-blue-500 font-semibold">Send Code</span> button to get a new code.</>
            }
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