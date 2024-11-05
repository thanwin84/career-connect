
import {
    Input, 
    Button,
} from '../components/ui'
import { useOutletContext } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { useUpdateUser } from "../api/UserApi";
import { useFilePreview } from '../hooks';
import { FormData as FData, User } from '../types';

export default function EditProfile(){
    const {user} = useOutletContext<{user:User}>()
    const {isPending, updateUser} = useUpdateUser()
    const {fileUrl, handleFileChange} = useFilePreview(user?.avatar?.[0])

    
    const {register, handleSubmit, formState} = useForm({
        defaultValues: user
    })
    const errors =formState.errors
    
    const rules = {
        avatar: {
            validate: {
                fileSize: (value: string[] | undefined): string | boolean => {
                    if (value && value[0]) {
                        const file = (value as unknown as FileList)[0];
                        if (file.size > 500000) {
                            return "File size cannot be larger than 0.5MB";
                        }
                    }
                    return true;
                }
            }
        },
        name: { required: "Name is required" },
        location: { required: "Location is required" }
    } as const;
    

    function action(data:FData){
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
                <h2 id="formTitle" className="mb-4 text-2xl font-semibold dark:text-slate-200">Profile</h2>
                
                <form
                    onSubmit={handleSubmit(action)}
                    aria-describedby="formTitle"
                    className="bg-white dark:bg-zinc-900" 
                    method="post" encType="multipart/form-data"
                >
                    
                    <div className="w-full flex gap-3">
                        <img className="w-40 h-36 rounded-md" src={fileUrl as string} />
                        <div className="flex flex-col self-start gap-8">
                            <h3 className="font-semibold text-xl dark:text-slate-200">Upload your profile Photo</h3>
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
                            {...register("location", rules.location)}
                            errorMessage={errors?.location?.message}
                        />
                        
                        <Input
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

