import React from "react";
import {useOutletContext} from 'react-router-dom'
import { DeleteAccount } from "../components";


export default function Account(){
    const {userData} = useOutletContext()
    
    
    
    return (
        <div className="h-screen w-full">
            <h1 className="px-2 mt-4 text-xl font-bold text-gray-800 dark:text-slate-200">Welcome Back, {userData.name} {userData.lastName}</h1>
            <DeleteAccount  className="mt-2" />
        </div>
    )
}

