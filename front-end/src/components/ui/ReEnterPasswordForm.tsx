import { FormData } from "../../types";
import {
    Button,
    Input,
} from "../ui"
import { useForm } from "react-hook-form";

type Props = {
    className?: string
    action: (formData:FormData)=> void
    title: string
    description: string
    isPending: boolean
}

export default function ReEnterPasswordForm({
    className, 
    action,
    title,
    description,
    isPending
}:Props){
    
    const {register, handleSubmit, formState: {errors}} = useForm()
    return (
        <div className={`w-full  p-10 bg-white dark:bg-zinc-900 flex items-center rounded-md ${className}`} >
            <div className="mx-auto">
            <h1 className="text-xl mb-2 font-semibold dark:text-slate-100">{title}</h1>
            <p className="mb-2 dark:text-slate-200 text-slate-800">{description}</p>
            <form 
                onSubmit={handleSubmit(action)} 
                className="flex flex-col justify-between h-full">
                <Input
                    type="password"
                    placeholder="Password"
                    className="mb-20"
                    {...register('password', {required: "Password is required"})}
                    errorMessage={errors.password?.message as string}
                />
                <Button
                    loading={isPending}
                >
                    Submit
                </Button>
            </form>
            </div>
        </div>
    )
}