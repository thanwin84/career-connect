import React from "react"
import {useFormStatus} from 'react-dom'
import Button from "./Button"

export default function SubmitForm({buttonText, className}){
    const {pending} = useFormStatus()
    return (
        <Button
            type="submit"
            classname={className}
            disabled={pending }
        >
            {pending ? buttonText.pending: buttonText.default}
        </Button>
    )
} 