import {useState, useEffect} from 'react'


export default function useQuery(fn){
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: ""
    })
   
    const runQuery = async()=>{
        if (!fn) return;
        try {
            setState(prev => ({...prev, isLoading: true}))
            const res = await fn()
            
            setState({data: res, isLoading: false, isError: false, error: ""})
        } catch (error) {
            setState(prev => ({...prev, isLoading: false, isError: true, error: error, data: null}))
        } 
    }
    
    useEffect(()=>{
        runQuery()
    }, [])

    
    return {...state, refetch: runQuery}
}