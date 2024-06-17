import React from "react"
import {useFormStatus} from 'react-dom'
import Button from "./Button"

export default function SubmitForm({buttonText}){
    const {pending} = useFormStatus()
    return (
        <Button
            type="submit"
            classname="m-2"
            disabled={pending}
        >
            {pending ? buttonText.pending: buttonText.default}
        </Button>
    )
}