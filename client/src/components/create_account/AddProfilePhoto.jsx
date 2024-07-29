import React, { useState } from "react";
import {Input, Button} from "../../components"
import { customFetch } from "../../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProfilePhoto({className, goBack, user}){
    const [imageUrl, setImageUrl] = useState(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleFileChange(e){
        const file = e.target.files[0]
        console.log(file)
        const url = URL.createObjectURL(file)
        setImageUrl(url)
        setFile(file)
    }
    async function handleFinish(){
        try {
            setLoading(true)
            const {data} = await customFetch.post("/auth/register", user)
            const formData = new FormData()
            formData.append("avatar", file)
            await customFetch.patch(
                `/users/${data.userId}/upload-profile-photo`, 
                formData, 
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                })
            setLoading(false)
            toast.success("you account is created successfully")
            navigate("/login")
        } catch (error) {
            setLoading(false)
            toast.error(toast.error(error?.response?.data.message))
        }
        
    }
    function handleBack(){
        goBack()
    }
    return (
        <section  className={`h-screen ${className}`} >
            <h2 className="dark:text-slate-200 text-xl mb-6">Add Your Profile Photo or Skip it to upload later.</h2>
            <div className="flex justify-center mb-4">
            <div className="border-2 border-dashed w-40 h-40 rounded-md">
                {imageUrl && (
                    <img className="w-full h-full" src={imageUrl}  />
                )}
            </div>
            </div>
           <div className="flex gap-2 lg:w-3/6 mx-auto" >
                <Input
                    type= "file"
                    name="avatar"
                    onChange={handleFileChange}
                />
                
           </div>
           <div className="flex gap-4 justify-between mt-4">
            <Button
                classname= "w-24"
                category="normal"
                onClick={handleBack}
            >
                Back
            </Button>
            <Button
                classname= "w-24"
                category="success"
                onClick={handleFinish}
                disabled={loading}
            >
                {loading ? "In progess...": "Finish"}
            </Button>
           </div>
        </section>
    )
}