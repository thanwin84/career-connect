import {useState} from 'react'

const config = {
    onSuccess: ()=>{},
    onError: ()=>{},
}

const useMutation = (mutationFn, config)=>{
    const [state, setState] = useState({
        isPending: false,
        data: null,
        isError: false,
        error: "",
        isSuccess: false
    })
    const {onError, onSuccess} = config
    async function mutate(formData){
        try {
            setState({data: null, isPending: true, isError: false, error: "", isSuccess: false})
            const data = await mutationFn(formData)
            onSuccess(data)
            setState({data: data, isPending: false, isError: false, error: "", isSuccess: true})
            
        } catch (error) {
            onError(error)
            setState({data: null, isPending: false, isError: true, error: error, isSuccess: false})
        }
    }
    function resetState(){
        setState(
            {isPending: false,
            data: null,
            isError: false,
            error: "",
            isSuccess: false}
        )
    }
    return {
        mutate,
        resetState,
        ...state
    }
}

export default useMutation