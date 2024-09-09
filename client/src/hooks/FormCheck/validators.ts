import { Validators } from "./types";



const a:Validators = [{required: true, errorMessage: "error", successMessage: "success"}]
export function validate(options: Validators = [], key: string, value: string) {
    
    for (const option of options){
        if (option.required && value === "") {
            return {
                errorMessage: option?.errorMessage || `${key} is required`,
                successMessage: option?.successMessage
            }
        }
        else if (option.maxLength && value.length > option.maxLength) {
            return {
                errorMessage: option?.errorMessage || `${key} can not be more than ${option.maxLength} chars long`,
                successMessage: option?.successMessage || ""
            }
        }
        else if (option.minLength && value.length < option.minLength) {
            return {
                errorMessage: option?.errorMessage || `${key} can not be less than ${option.minLength}`,
                successMessage: option?.successMessage || ""
            }
        }
        else if (option.pattern && !new RegExp(option.pattern).test(value)) {
            return {
                errorMessage: option?.errorMessage || `Patern does not match`,
                successMessage: option?.successMessage || ""
            }
        } 
        else if (option.isEmail) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                return {
                    errorMessage: option?.errorMessage || "Please enter valid email address",
                    successMessage: option?.successMessage || ""
                }
            }
        }
    }
    
    return {
        errorMessage:  "",
        successMessage: ""
    }
}