import React from "react";
import {
    Input, 
    Button,
    NumberInput
} from '../components'
import { useOutletContext, Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async({request})=>{
    const formData = await request.formData()

    const file = formData.get("avatar")
    
    if (file && file.size > 500000){
        toast.error("Image size to large")
        return null
    }
    try {
        await customFetch.patch("/users/update-user", formData)
        toast.success("Profile updated successfully", {autoClose: 500})
        return redirect("../profile")
    } catch (error) {
        toast.error(error?.request?.data?.message)
    }
    return null
}

export default function EditProfile(){
    const {user} = useOutletContext()
    const isSubmiting = useNavigation().state === "submitting"
    
    const {name, lastName, email, location, phoneNumber} = user
    
    
    return (
        <section className="p-4 ">
            <Form className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow-md" method="post" encType="multipart/form-data">
                <h3 className="mb-2 text-2xl dark:text-slate-200">Profile</h3>
                <div className="grid gap-4 lg:grid-cols-3">
                    <Input 
                        label="Select an image File (Max 0.5MB)"
                        type="file"
                        name="avatar"
                        accept="image/*"
                    /> 
                    <Input
                        label="Name"
                        name="name"
                        defaultValue={name}
                     />
                     <Input
                        label="Last Name"
                        name="lastName"
                        defaultValue={lastName}
                     />
                     <Input
                        type="email"
                        label="Email"
                        name="email"
                        defaultValue={email}
                     />
                     <Input
                        label="Location"
                        name="location"
                        defaultValue={location}
                     />
                     
                     <NumberInput
                        label="Phone Number"
                        defaultPhoneNumber={phoneNumber}
                     />
                     <div className="flex flex-col justify-end">
                        <Button
                            type="submit"
                            disabled={isSubmiting}
                        >
                            {isSubmiting ? "Submitting...": "Submit"}
                        </Button>
                     </div>
                </div>
            </Form>

        </section>
    )
}