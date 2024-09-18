import {
    Input, 
    Button,
    NumberInput
} from '../components/ui'
import { useOutletContext } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { useUpdateUser } from "../api/UserApi";
import { useFilePreview } from '../hooks';

export default function EditProfile(){
    const {user} = useOutletContext()
    const {isPending, updateUser} = useUpdateUser()
    const {fileUrl, handleFileChange} = useFilePreview(user?.avatar[0])

    
    const {register, handleSubmit, formState} = useForm({
        defaultValues: user
    })
    const errors =formState.errors
    
    const rules = {
        avatar: {
            validate: {
                fileSize: (files)=> {
                    const file = files?.[0]
                    if (file && file.size > 500000){
                        return "File size can not be larger than 0.5mb"
                    }
                    return true
                }
            }
        },
        name: {required: "Name is required"},
        location: {required: "Location is required"}

    }

    function action(data){
        const formData = new FormData()
        const file = data.avatar[0]
        if (file){
            formData.append('avatar', file)
        }
        formData.append("name",data.name)
        formData.append( "lastName",data.lastName)
        formData.append("location" ,data?.location || "")
        formData.append("phoneNumber",data?.phoneNumber || "")
        updateUser(formData)
    }
    
    return (
        <section className="p-4  ">
            <div className="bg-white  dark:bg-zinc-900 p-4 rounded-md shadow-md">
                <h3 id="formTitle" className="mb-4 text-2xl font-semibold dark:text-slate-200">Profile</h3>
                
                <form
                    onSubmit={handleSubmit(action)}
                    aria-describedby="formTitle"
                    className="bg-white dark:bg-zinc-900" 
                    method="post" encType="multipart/form-data"
                >
                    
                    <div className="w-full flex gap-3">
                        <img className="w-40 h-36 rounded-md" src={fileUrl} />
                        <div className="flex flex-col self-start gap-8">
                            <h4 className="font-semibold text-xl dark:text-slate-200">Upload your profile Photo</h4>
                            <Input 
                                label="Select an image File (Max 0.5MB)"
                                type="file"
                                className=""
                                accept="image/*"
                                {...register('avatar', rules.avatar)}
                                onChange={(e)=>handleFileChange(e)}
                                errorMessage={errors?.avatar?.message}
                            /> 
                        </div>
                    </div>
                    <div className="mt-4 w-full grid gap-4 lg:grid-cols-2">
                        <Input
                            label="Name"
                            {...register("name", rules.name)}
                            errorMessage={errors?.name?.message}
                        />
                        <Input
                            label="Last Name"
                            errorMessage={errors?.lastName?.message}
                            {...register("lastName", {required: "Last name is required"})}
                        />
                        <Input
                            type="email"
                            label="Email"
                            {...register("email")}
                            disabled={true}
                            className="text-gray-400 cursor-not-allowed"
                        />
                        <Input
                            label="Location"
                            name="location"
                            defaultValue={location}
                            {...register("location", rules.location)}
                            errorMessage={errors?.location?.message}

                        />
                        
                        <NumberInput
                            label="Phone Number"
                            {...register("phoneNumber")}
                        />
                        
                    </div >
                    <div className="flex justify-end mt-4">
                        <Button 
                            category="success"
                            classname="text-nowrap"
                            loadingText={"loading"}
                            loading={isPending}
                        >
                            Update User
                    </Button> 
                    </div>
                </form>
            </div>

        </section>
    )
}

