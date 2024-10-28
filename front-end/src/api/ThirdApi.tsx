import { sendCodeRequest, verifyCodeRequest } from "../apiRequest"
import { useMutation } from "../hooks"
import { toast } from "react-toastify"
export const useSendCode = ()=>{
    const {
        mutate: sendAuthCode,
        isPending,
        isSuccess
    } = useMutation(
        sendCodeRequest,
        {
            onSuccess: ()=>{
                toast.success("Verification code has been sent")
            },
            onError: (error)=>{
                toast.error(error?.response?.data.message)
            }
        }
    )
    return {
        sendAuthCode,
        isPending,
        isSuccess
    }
}

export const useVerifyCode = ()=>{
    
    const {
        mutate:verifyCode,
        isPending
    } = useMutation(
        verifyCodeRequest,
        {
            onSuccess: (data)=>{
                console.log("data", data)
                if (data === 'approved')
                toast.success("Verificatin is successfull")
            },
            onError: (error)=>{
                console.log(error)
                toast.error(error?.response?.data.message)
            }
        }
    )

    return {
        verifyCode,
        isPending
    }

}