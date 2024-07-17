import React , {useState} from "react";
import { countries } from "../../../constants/countyCodes";
import { useTwoStepAuthContext } from "./Setting/TwoStepAuthentication";
import { IoIosArrowBack } from "react-icons/io";

export default function SelectCountry({onSelect, selectedCountry, handleBackClick}){
    
    return (
        <div className="bg-white dark:bg-zinc-900 px-6 py-6 rounded-md">
            <div className=" mb-4">
                <button 
                    className="dark:text-slate-300 flex"
                    onClick={handleBackClick}
                >
                    <IoIosArrowBack className="text-2xl hover:text-blue-500"/>
                </button>
            </div>
            <h2 className="px-4 mb-4 text-xl font-semibold dark:text-slate-100">Select a country</h2>
            <ul className="p-4 h-80 overflow-y-auto border">
                {countries.map((item, index)=>(
                    <li 
                        key={index} 
                        onClick={()=>onSelect(item)}
                        className="p-2 cursor-pointer rounded-md w-full flex justify-between text-xl mb-1 hover:bg-slate-50 dark:hover:bg-zinc-800"
                    >
                        <span className="dark:text-slate-200">{item.name} ({item.code})</span>
                        <input 
                            type="radio" 
                            checked={item.name === selectedCountry?.name} className="w-4" 
                            readOnly
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}