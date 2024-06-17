import React from "react"
import {useFormStatus} from 'react-dom'
import Button from "./Button"

export default function SubmitForm(){
    const {pending} = useFormStatus()
    return (
        <Button
            type="submit"
            classname="m-2"
            disabled={pending}
        >
            {pending ? "Submitting..": "Submit" }
        </Button>
    )
}