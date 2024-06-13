import { useState, useEffect } from "react";

export default function useDebounce(value, delay=500){
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(()=>{
        const id = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay)

        // cleanup function to cancel the timeout if the value or delay changes
        return ()=>{
            clearTimeout(id)
        }
    }, [value, delay])
    
    return debouncedValue
}
