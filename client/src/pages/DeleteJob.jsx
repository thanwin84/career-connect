
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";



export const action = async ({params})=>{
    const id = params.id
    try {
        await customFetch.delete(`/jobs/${id}`)
        toast.success("Job is deleted successfully")
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    return redirect("../all-jobs")
}