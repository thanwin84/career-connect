import React from "react";
import {
    ChangePassword,
    TwoStepAuthentication
} from "../components"

export default function PasswordAndSecurity({className}){
    return (
        <div className={`w-full h-screen   ${className}`}>
            <ChangePassword />
            <TwoStepAuthentication />
        </div>
    )
}