import React, { useState } from "react";
import {Input} from "../components"

export default function NumberInput({defaultPhoneNumber,...props}){
    const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber || "")
    

    function validateNumber(number){
        const regex = /^\+?\d*$/
        return regex.test(number)
    }
    function handleChange(e){
        if (validateNumber(e.target.value)){
            setPhoneNumber(e.target.value)
        }
    }
    return (
        <Input
            type="tel"
            name="phoneNumber" 
            value={phoneNumber}
            onChange={handleChange}
            {...props}
        />
    )
}