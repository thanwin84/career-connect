import React from "react"
import {useFormStatus} from 'react-dom'
import {Spinner, Button} from '../ui'

export default function SubmitForm({
    buttonText, 
    className,
    category
}){
    const {pending} = useFormStatus()
    
    return (
        <Button
            type="submit"
            category={category}
            loading={pending}
            loadingText={buttonText.pending}
            classname={className}
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