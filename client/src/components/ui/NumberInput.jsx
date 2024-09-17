import  { useState, forwardRef } from "react";
import {Input} from "../ui"

const NumberInput= forwardRef(({defaultPhoneNumber,...props}, ref)=>{
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
            ref={ref}
            {...props}
        />
    )
})

export default NumberInput