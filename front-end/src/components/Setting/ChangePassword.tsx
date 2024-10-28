import {
    Button,
    Input,
    LoadingButton
} from "../ui"
import { useChangePassword } from "../../api/UserApi";
import { useForm } from "react-hook-form";

export default function ChangePassword(){
    const {changePassword, isPending} = useChangePassword()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    
    return (
        <div className="w-full">
            <h4 className="text-xl text-slate-600 border-b py-2 dark:text-slate-200">Password and Security</h4>
            <p className="py-2 text-slate-700 dark:text-slate-300">Enter your current password along with new one to change it. </p>
            <form className="py-4" onSubmit={handleSubmit(changePassword)} >
                <Input
                    label = "Old Password"
                    placeholder= "Enter your old password"
                    type="password"
                    className="w-2/5 mb-2"
                    {...register("oldPassword", {required: "PLease enter your old password"})}
                    errorMessage={errors?.oldPassword?.message as string}
                />
                <div className="flex gap-4 mb-4">
                    <Input
                        label = "New Password"
                        placeholder= "Enter your new password"
                        type="password"
                        {...register('newPassword', {required: "Enter your new password"})}
                        errorMessage={errors?.newPassword?.message as string}
                    />
                    <div className="w-full">
                        <Input
                            label = "Confirm Password"
                            placeholder= "Enter new password again"
                            type="password"
                        />
                        
                    </div>
                </div>
                {isPending ? <LoadingButton/>: (
                    <Button
                        type="submit"
                        category="success"
                        classname= {`mt-4 w-auto bg-green-300 `}
                    >
                        Save changes
                    </Button>)
                }
                
            </form>
        </div>
    )
}