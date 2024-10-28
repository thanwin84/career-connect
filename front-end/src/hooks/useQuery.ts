import {useState, useEffect} from 'react'

type QueryConfig<TData> = {
    onSuccess?: (data:TData) => void
    onError?: (error:any) => void
}

type UserQueryState<TData> = {
    data: TData | null
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    error: any
}



const defaultConfig:QueryConfig<any> = {
    onSuccess: ()=>{},
    onError: ()=>{},
}

export default function useQuery<TData>(
    fn:()=> Promise<TData>,
    config: QueryConfig<TData> = defaultConfig
){
    const [state, setState] = useState<UserQueryState<TData>>({
        data: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: ""
    })
    const {onError, onSuccess} = config
   
    const runQuery = async()=>{
        if (!fn) return;
        try {
            setState(prev => ({...prev, isLoading: true}))
            const res = await fn()
            setState(
                {
                    data: res, 
                    isLoading: false,
                    isSuccess: true ,
                    isError: false, 
                    error: ""
                })
            if (onSuccess){
                onSuccess(res)
            }
        } catch (error) {
            setState(prev => (
                    {
                        ...prev, 
                        isLoading: false, 
                        isError: true, 
                        error: error, 
                        data: null
                    }
                ))
            if (onError){
                onError(error)
            }
        } 
    }
    
    useEffect(()=>{
        runQuery()
    }, [])

    
    return {...state, refetch: runQuery}
}