import { useRef } from "react";

function useDebounce(delay:number){
    const timeoutRef = useRef<ReturnType<typeof setTimeout>| null>(null)

    const debounce = (callback:()=>void)=>{
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