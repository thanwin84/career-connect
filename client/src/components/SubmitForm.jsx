import React from "react"
import {useFormStatus} from 'react-dom'
import {Button, Spinner} from '../components'
export default function SubmitForm({
    buttonText, className
}){
    const {pending} = useFormStatus()
    
    return (
        <Button
            type="submit"
            loading={pending}
            loadingText={buttonText.pending}
            classname="w-full"
        >
            {pending ? 
            <span className="flex gap-4 justify-center">
                <Spinner 
                    size='w-4 h-4' 
                    color='border-slate-200'
                    borderThickness="border-2" 
                />
                {buttonText.pending}
            </span>
            : buttonText.default}
        </Button>
    )
} 