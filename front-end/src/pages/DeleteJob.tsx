
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { ActionFunctionArgs, redirect } from "react-router-dom";



export const action = async ({params}:ActionFunctionArgs)=>{
    const id = params.id
    try {
        await customFetch.delete(`/jobs/${id}`)
        toast.success("Job is deleted successfully")
    } catch (error:any) {
        toast.error(error?.response?.data?.message)
    }
    return redirect("../all-jobs")
}