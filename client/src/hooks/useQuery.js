import {useState, useEffect} from 'react'

const defaultConfig = {
    onSuccess: ()=>{},
    onError: ()=>{},
}
export default function useQuery(fn, config=defaultConfig){
    const [state, setState] = useState({
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
            setState({data: res, isLoading: false, isError: false, error: ""})
            onSuccess(res)
        } catch (error) {
            setState(prev => ({...prev, isLoading: false, isError: true, error: error, data: null}))
            onError(error)
        } 
    }
    
    useEffect(()=>{
        runQuery()
    }, [])

    
    return {...state, refetch: runQuery}
}