import  {forwardRef, useState} from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {Input} from '../ui'



const Password = forwardRef(({
    className,
    ...props
},ref)=>{
    const [showPassword, setShowPassword] = useState(false) 
    function handleClick(){
        setShowPassword(!showPassword)
    }

    return (
        <div className={`flex  relative gap-3 ${className}`} >
            <Input 
                type={showPassword ? "text": "password"}
                label="Password"
                placeholder= "Enter your password"
                className=""
                {...props}
                ref={ref}
                aria-label="password"
                
            />
            <span
                className=" absolute right-2 top-11 cursor-pointer dark:text-slate-300"
                onClick={handleClick}
            >
                {showPassword ? <FaRegEyeSlash/>: <FaEye/>}
            </span>
        </div>
    )
})

export default Password