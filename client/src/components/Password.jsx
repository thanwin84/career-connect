import React, {useState} from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {Input} from '../components'


export default function Password(){
    const [showPassword, setShowPassword] = useState(false) 
    function handleClick(){
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex  gap-3">
            <Input 
                type={showPassword ? "text": "password"}
                label="Password"
                placeholder= "Enter your password"
                name = "password"
                className=""
                required
            />
            <span
                className="py-10 cursor-pointer dark:text-slate-300"
                onClick={handleClick}
            >
                {showPassword ? <FaRegEyeSlash/>: <FaEye/>}
            </span>
        </div>
    )
}