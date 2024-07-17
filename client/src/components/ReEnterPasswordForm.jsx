import React from "react";
import {
    Input,
    SubmitForm
} from "../components"

export default function ReEnterPasswordForm({className, action}){
    return (
        <div className={`w-full  p-10 bg-white dark:bg-zinc-900 flex items-center rounded-md ${className}`} >
            <div className="mx-auto">
            <h4 className="text-xl mb-2 font-semibold dark:text-slate-100">Please re-enter your password</h4>
            <p className="mb-2 dark:text-slate-200 text-slate-800">For your security, you must re-enter your password to continue</p>
            <form action={action} className="flex flex-col justify-between h-full">
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="mb-20"
                    required
                />
                <SubmitForm 
                    buttonText={{pending: "verifying...", default: "Submit"}}
                />
            </form>
            </div>
        </div>
    )
}