import { ReactNode } from "react"
import { useTabContext } from "./Tabs"
type Props = {
    children: ReactNode
    className?: string
}
export default function TabContentList({
    children,
    className
}:Props){
    const {currentTab} = useTabContext('TabContentList')
    return (
        <div 
            role="tabpanel" 
            aria-labelledby={`tab-${currentTab}`} 
            className={`mt-2 ${className}` }
        >
            {children}
        </div>
    )
}