import { ReactNode } from "react"
import { useComboContext } from "./ComboBox"

type Props = {
    children: ReactNode
    value: string
    className?: string
    
}

export default function ComboBoxListItem({value, children, className}:Props){
    const {handleClick} = useComboContext()
    return (
        <li
            className={`cursor-pointer ${className}`}
            onClick={()=>handleClick(value)}
        >
            {children}
        </li>
    )
}