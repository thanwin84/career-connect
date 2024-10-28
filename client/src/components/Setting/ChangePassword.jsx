import  { useState } from "react";
import {
    Button,
    Input,
    Alert
} from "../ui"
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChangePassword(){
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
   
    const navigate = useNavigate()
    const {pending} = useFormStatus()
    
    const canSubmit = Object.values(passwords).every(value=> value !== "")
    function handleChange(e){
        const {name, value} = e.target
        setPasswords(prev=>({
            ...prev,
            [name]: value
        }))
    }
    async function action(formData){
        const ob = Object.fromEntries(formData.entries())
        try {
            await customFetch.patch("/auth/change-password", ob)
            toast.success("Password has been updated successfully", {autoClose: 500})
            navigate("/dashboard/setting")
        } catch (error) {
            toast.error(error?.response?.data.message)
        }

    }
    const wrongNewPassword = passwords.confirmPassword !== "" && passwords.newPassword !== ""  && passwords.confirmPassword !== passwords.newPassword
    return (
        <div className="w-full">
            <h4 className="text-xl text-slate-600 border-b py-2 dark:text-slate-200">Password and Security</h4>
            <p className="py-2 text-slate-700 dark:text-slate-300">Enter your current password along with new one to change it. </p>
            <form className="py-4" action={action} >
                <Input
                    name="oldPassword"
                    label = "Old Password"
                    placeholder= "Enter your old password"
                    type="password"
                    className="w-2/5 mb-2"
                    onChange = {handleChange}
                    required
                />
                <div className="flex gap-4 mb-4">
                    <Input
                        name="newPassword"
                        label = "New Password"
                        placeholder= "Enter your new password"
                        type="password"
                        onChange={handleChange}
                        required
                    />
                    <div className="w-full">
                        <Input
                            name="confirmPassword"
                            label = "Confirm Password"
                            placeholder= "Enter new password again"
                            type="password"
                            onChange ={handleChange}
                            required
                        />
                        {wrongNewPassword && <Alert message="Password do not match" />}
                    </div>
                </div>
                <Button
                    category="success"
                    classname= {`mt-4 w-auto bg-green-300 ${canSubmit ? "bg-green-800": ""} ${(!canSubmit || pending) ? "cursor-not-allowed": ""}`}
                    disabled={!canSubmit}
                >
                    {pending ? "Updating...": "Save changes"}
                </Button>
                
            </form>
        </div>
    )
}