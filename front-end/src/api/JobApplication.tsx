import { toast } from "react-toastify"
import { createJobApplicationRequest, getMyApplicationRequest } from "../apiRequest"
import { useMutation, useQuery } from "../hooks"

export const useCreateJobApplication = ()=>{
    const {
        mutate: createJobApplication,
        isPending,
        isSuccess,
        resetState,
        isError,
        error
    } = useMutation(
        createJobApplicationRequest,
        {
            onSuccess: (data)=>{
                console.log(data)
                toast.success("You've applied successfully")
            },
            onError: (error: any)=>{
                console.log(error)
            }
        }
    )
    return {
        createJobApplication,
        isPending,
        isSuccess,
        resetState,
        isError,
        error
    }
}

export const useGetMyApplications = ()=>{
    const {
        data,
        isLoading,
        isError,
        isSuccess
    } = useQuery(
        getMyApplicationRequest
    )
    return {
        data,
        isLoading,
        isError,
        isSuccess
    }
}