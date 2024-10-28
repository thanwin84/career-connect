import {
    createJobRequest,
    updateJobRequest
} from '../apiRequest'
import {toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "../hooks";
import { FormData } from '../types';


export const useCreateJob = ()=>{
    const navigate = useNavigate()

    const {mutate:createJob, isPending} = useMutation(
        createJobRequest,
        {
            onSuccess: ()=> {
                navigate("/dashboard/all-jobs")
                toast.success("Job has been created successfully")
            },
            onError: (error)=>{
                toast.error(error.response?.message)
            }
        }
    )

    return {
        createJob,
        isPending
    }
}

export const useUpdateJob = ()=>{
    const naviage = useNavigate()
    const {id} = useParams()
    const {
        isPending,
        mutate: updateJob
    } = useMutation(
        (formData:FormData)=>updateJobRequest(id as string, formData),
        {
            onSuccess: ()=>{
                naviage("../all-jobs")
                toast.success("Job is updated successfully")
            },
            onError: (error)=>{
                toast.error(error?.response?.message)
            }
        }
    )
    return {
        isPending,
        updateJob
    }
}