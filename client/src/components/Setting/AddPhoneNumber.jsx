import React, { useState } from "react";
import {Input, Select, SubmitForm} from "../../components"
export default function AddPhoneNumber(){
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState(false)

    async function action(){

    }
    return (
        <div className="bg-zinc-900 py-16 px-6 rounded-md">
            <h4 className="mb-2 text-xl  dark:text-slate-100">Add Phone Number</h4>
            <p className="dark:text-slate-300 mb-4">You must add your phone number to turn on Two factor authentication.</p>
            <form action={action}>
                <Input
                    //placeholder= "Enter phone number with country code"
                    name="phoneNumber"
                    className="mb-10"
                    defaultValue="+88"
                />
                <SubmitForm
                    buttonText={{
                        default: "Next",
                        pending: "In progress..."
                    }}
                />
            </form>
        </div>
    )
}