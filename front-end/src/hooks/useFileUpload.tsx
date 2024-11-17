import { useState } from "react"
import { customFetch } from "../utils"
import { FormData } from "../types"



export default function useFileUpload(){
    const [state, setState] = useState({
        isLoading: false,
        isSuccess: true,
        data: null,
        isError: false,
        error: null
    })
    const [uploadParcentage, setUploadParcentage] = useState(0)

    async function uploadPhoto(formData:FormData){
        try {
            setState({
                isLoading: true,
                isSuccess: false,
                data: null,
                isError: false,
                error: null
            })
            const response = await customFetch.patch(
                "/users/upload-profile-photo",
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"},
                    onUploadProgress: (progressEvent)=>{
                        if (progressEvent.total){
                            const parcentage = Math.round(progressEvent.loaded * 100) / progressEvent.total
                            setUploadParcentage(parcentage)
                        }
                    }
                }
            )
            setState({
                isLoading: false,
                isSuccess: true,
                data: response.data,
                isError: false,
                error: null
            })
        } catch (error: any) {
            setState({
                isLoading: false,
                isSuccess: false,
                data: null,
                isError: true,
                error: error
            })
        }
    }

    return {
        uploadPhoto,
        ...state,
        uploadParcentage
    }
}