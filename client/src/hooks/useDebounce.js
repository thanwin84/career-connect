import { useRef } from "react";

function useDebounce( delay){
    const timeoutRef = useRef(null)

    const debounce = (callback)=>{
        if (timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(()=>{
            callback()
        }, delay)
    }
    return debounce
}

export default useDebounce