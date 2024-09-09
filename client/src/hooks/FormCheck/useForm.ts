import { EventHandler, useRef, useState} from "react"
import { validate } from "./validators.ts"
import {
    FormObject,
    ErrorObject,
    Refs,
    Validators
} from './types.ts'



export default function useForm(){
    const [formObject, setFormObject] = useState<FormObject>({})
    const [errors, setErrors] = useState<ErrorObject>({})
    const [isError, setIsError] = useState(false)
    const validatorsMap = {}
    const refs:Refs= {}
    
    const [isLoading, setIsLoading] = useState(false)
   
    
    function onChangeHanlder<T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(e:React.ChangeEvent<T>){
        const target = e.target
        const key = target.name
        if (target instanceof HTMLInputElement){
            if (target.type === 'checkbox'){
                setFormObject(prev => ({...prev, [target.name]: target.checked.toString()}))
            }
            else if (target.type === 'radio'){
               if (target.checked){
                setFormObject(prev => ({...prev, [target.name]: target.value}))
               }
            }
            else {
                setFormObject(prev => ({...prev, [target.name]: target.value}))
                const {errorMessage}= validate(validatorsMap[key], key, target.value)
                setErrors(prev => ({...prev, [target.name]: errorMessage}))
            }
        }
        else if (target instanceof HTMLSelectElement 
            || target instanceof HTMLTextAreaElement
        ){
            setFormObject(prev => ({...prev, [target.name]: target.value}))
            const {errorMessage} = validate(validatorsMap[key], key, target.value)
            setErrors(prev => ({...prev, [target.name]: errorMessage}))
            
        }
        
    }
    function register(name:string, validators:Validators){
        validatorsMap[name] = validators 
        const ref = useRef(null)
        refs[name] = ref
        const props= {
            name,
            onChange: onChangeHanlder,
            ref: ref
        }
        
        return props
    }
    
    
    async function handleSubmit(e:React.FormEvent,cb:(formData:Object)=>Promise<void>){
        setIsLoading(true)
        e.preventDefault()
        const errorsObject = {}
        let hasErrors = false
        const ob = {}
        Object.keys(refs).forEach(key =>{
            const ref = refs[key]
            
            let value = ""
            if (ref.current instanceof HTMLInputElement){
                if (ref.current.type === 'checkbox'){
                    value = ref.current.checked.toString()
                }
                else if (ref.current.type === "radio"){
                    value = ref.current.value
                }
                else {
                    value = ref.current.value
                }
            }
            else if (ref.current instanceof HTMLSelectElement || ref.current instanceof HTMLTextAreaElement) {
                value = ref.current.value
            }
            const {errorMessage} = validate(validatorsMap[key], key, value)
            if (errorMessage !== "") hasErrors = true
            errorsObject[key] = errorMessage
            ob[key] = value
            

        })
        
        setFormObject(ob)
        setErrors(errorsObject)
        setIsError(false)
        setIsLoading(false)
        if (!hasErrors){
           
            await cb(ob)
        }
    }

    return {
        register,
        formObject,
        handleSubmit,
        errors,
        isError,
        isLoading
    }
    
}