import React, {useEffect, useState} from "react";

export default function useWindowScreenSize(){
    const [currentBreakPoint, setCurrentBreakPoint] = useState("lg")

    function resizeHandler(){
        const sizes = {
            "sm": { min: 0, max: 639 },
            "md": { min: 640, max: 767 },
            "lg": { min: 768, max: 1023 },
            "xl": { min: 1024, max: 1279 },
            "2xl": { min: 1280, max: Infinity }
        };
        const width = window.innerWidth
        let matchedBreakPoint = ""
        
        Object.keys(sizes).forEach(key =>{
            if (width >= sizes[key].min && width <= sizes[key].max){
                
                matchedBreakPoint = key
            }
        })
        setCurrentBreakPoint(matchedBreakPoint)
    }

    useEffect(()=>{
        window.addEventListener('resize', resizeHandler)
        window.addEventListener('load', resizeHandler)
        return ()=>{
            window.removeEventListener('resize', resizeHandler)
            window.addEventListener('load', resizeHandler)
        }
    }, [])

    return currentBreakPoint
}

