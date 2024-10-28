
type ValidatorsOptions = {
    required: boolean,
    maxLength: number,
    minLength: number,
    pattern:string,
    isEmail: boolean
}

type SingleValidator = {
    [k in keyof ValidatorsOptions]?: ValidatorsOptions[k]
} & {
    errorMessage?: string
    successMessage?: string
}

type Validators = SingleValidator[]


type FormObject = Record<string, string>
type ErrorObject = Record<string, string>
type Refs = Record<string, React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>>


export {
    Validators,
    FormObject,
    ErrorObject,
    Refs
}