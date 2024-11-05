import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
}
export default function TabContentList({
    children,
    className
}:Props){
    return (
        <div 
            className={`mt-2 ${className}` }
        >
            {children}
        </div>
    )
}