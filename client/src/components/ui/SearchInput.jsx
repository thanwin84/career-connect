import React, { useState, useId } from "react";


export default function SearchInput({
    label, 
    className, 
    name,
    datas,
    onDropDownClick,
    disabled=false,
    defaultValue
}){
    
    
    const [searchTerm, setSearchTerm] = useState(defaultValue)
    const [filteredData, setFilteredData] = useState([])
    const [showDropDown, setShowDropDown] = useState(false)
    const id = useId()
    const disabledInput = disabled && defaultValue === ""
    
    
    function handleChange(e){
        const value = e.target.value.trim()
        
        setSearchTerm(e.target.value)
        
        const filteredData = datas.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()))
        
        setFilteredData(filteredData)
        setShowDropDown(filteredData.length > 0 && value !== "")
    }

    function hanldeClick(item){
        
        setSearchTerm(item.name)
        setShowDropDown(false)
        if (onDropDownClick){
            onDropDownClick(item)
        }
    }
   
    return (
        <div className={`w-full  ${className}`} >
            {label && <label htmlFor={id} className="block mb-2  text-slate-600 dark:text-slate-200">{label}</label>}
            <input 
                id={id}
                type="search"
                className="border border-gray-200 w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-700 text-black dark:text-slate-100 outline-none  focus:ring-1 dark:ring-slate-100"
                placeholder={`${disabled ? "disabled": ""}`}
                name={name}
                value={searchTerm}
                onChange={handleChange}
                autoComplete="off"
                disabled={disabledInput}
                
            />
           {showDropDown && (
                <ul className="mt-2 pt-4 pb-4 pl-4 max-h-36 overflow-y-auto  border border-gray-200 dark:bg-zinc-700 rounded-md absolute bg-gray-50 w-full">
                {filteredData?.map(item => (
                    <li 
                        key={item._id}
                        onClick={()=>hanldeClick(item)}
                        className="cursor-pointer dark:text-slate-200 mb-2"
                    >
                        {item.name}
                    </li>
                ))}
                {filteredData.length === 0 && (
                    <p>Sorry, The value you've typed is not found</p>
                )}
            </ul>
           )}
        </div>
    )
}