import {  useNavigate } from "react-router-dom"
import { 
    addEducationRecordRequest,
    loginRequest, 
    registerUserRequest,
    updateUserRequest,
    updateEducationRecordRequest,
    deleteEducationRecordRequest,
    getUserInformationRequest
} from "../apiRequest"
import { useMutation, useQuery } from "../hooks"
import { toast } from "react-toastify"
import { useMainContext } from "../contexts/MainContext"
import { useProfileContext } from "../pages/Profile"


export const useLoginUser = ()=>{
    const navigate = useNavigate()
    const {login:loginStateUpdate} = useMainContext()
    const {mutate:loginUser, isPending} = useMutation(
        loginRequest,
        {
            onSuccess: (data)=>{
                loginStateUpdate(data)
                toast.success("Login is successfull")
                navigate("/home", {replace: true})
            },
            onError: (error)=>{
                toast.error(error?.response?.data.message)
            }
        }
    )
    return {
        loginUser,
        isPending
    }
}

export const useCreateUser = ()=>{
    const navigate = useNavigate()
    const {
        mutate:createUser,
        isPending
    } = useMutation(
        registerUserRequest,
        {
            onSuccess: ()=>{
                toast.success("Registration is successfull")
                navigate("/login")
            },
            onError: (error)=>{
                toast.error(error?.response?.data.message)
            }
        }
    )
    return {
        isPending,
        createUser
    }
}

export const useUpdateUser = ()=>{
    const navigate = useNavigate()
    const {isPending, mutate:updateUser} = useMutation(
        updateUserRequest,
        {
            onSuccess: ()=>{
                toast.success("User information is updated successfully")
                navigate('/dashboard/profile')
            },
            onError: (error)=>{
                toast.error(error?.response?.data.message)
            }
        }
    )
    return {
        updateUser,
        isPending
    }
}

export const useAddEducationRecord = ()=>{
    const {
        mutate:addEducationRecord,
        isPending,
        isSuccess
    } = useMutation(
        addEducationRecordRequest,
        {
            onSuccess: ()=>{
                toast.success("Education record is added successfully")
            },
            onError: (error)=>{
                toast.error(error?.response?.data.message)
            }
        }
    )
    return {
        addEducationRecord,
        isPending,
        isSuccess
    }
}

export const useUpdateEducationRecord = ()=>{
    const {selectedEducationRecord} = useProfileContext()
    const {_id} = selectedEducationRecord
    const {
        mutate:updateEducationRecord, 
        isPending, 
        isSuccess} = useMutation(
            (formData)=>updateEducationRecordRequest(formData, _id),
            {
                onSuccess: ()=>{
                    toast.success("Education record is updated successfully.")
                },
                onError: (error)=>{
                    toast.error(error?.response?.data.message)
                }
            }
        )
    return {
        updateEducationRecord,
        isPending,
        isSuccess
    }
}

export const useDeleteEducationRecord = ()=>{
    const {selectedEducationRecord} = useProfileContext()
    const {_id} = selectedEducationRecord
    const {
        mutate: deleteEducationRecord,
        isPending,
        isSuccess
    } = useMutation(
        ()=>deleteEducationRecordRequest(_id),
        {
            onSuccess: ()=>{
                toast.success("Education is deleted successfully")
            },
            onError: (error)=>{
                toast.error(error?.response?.data.message)
            }
        }
    )
    return {
        deleteEducationRecord,
        isPending,
        isSuccess
    }

}

export const useUserInformation = ()=>{
    const {
        data:user,
        isLoading
    } = useQuery(
        getUserInformationRequest
    )
    console.log(user)
    return {
        user,
        isLoading
    }
}