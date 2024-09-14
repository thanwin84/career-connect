import React, { useState, useEffect, useRef } from "react";
import {Input} from '.'




export default function ComboBox({
    label, 
    className, 
    name,
    datas,
    onChange,
    defaultValue,
    getSelectedOption
}){
    
    const [searchTerm, setSearchTerm] = useState("")
    const [open, setOpen] = useState(false)
    const inputRef = useRef(null)
    const dropDownRef = useRef(null)
    const dropDownId = `dropdown-${name}`

    function handleChange(e){
        const value = e.target.value.trim()
        setSearchTerm(e.target.value)
        setOpen(true)
        onChange(value)
        
    }
    

    function hanldeClick(item){
        setSearchTerm(item)
        setOpen(false)
        if (getSelectedOption){
            getSelectedOption(item)
        }
    }
    
    useEffect(()=>{
        function handleClickoutside(e){
            if (inputRef.current && !inputRef.current.contains(e.target) && dropDownRef.current && !dropDownRef.current.contains(e.target)){
                setOpen(false)

            }
        }
        document.addEventListener("mousedown", handleClickoutside)


        return ()=> document.removeEventListener('mousedown', handleClickoutside)
    },[])
    
    
    console.log("cities", datas)
    return (
        <div className={`w-full relative ${className}`} >
            <Input
                label={label}
                name={name}
                onChange={(e)=>handleChange(e)}
                onFocus={()=>setOpen(true)}
                ref={inputRef}
                value={searchTerm || defaultValue}
                aria-controls={dropDownId}
                aria-expanded={open}
                aria-autocomplete="list"
                role="combobox"
                autoComplete="new-password"
                
            />
            {open && (
                <DropDownList 
                    ref={dropDownRef}
                    datas={datas} 
                    hanldeClick={hanldeClick} 
                    id={dropDownId}
                />
            )}
           
        </div>
    )
}

function DropDownList({datas=[], hanldeClick, className="", ref, id}){
    if (datas.length === 0){
        return null
    }
    return (
        <ul 
            id ={id} 
            role="listbox" 
            ref={ref} 
            className={`mt-2 pt-4 px-1 pb-4  max-h-56 overflow-y-auto  border border-gray-200 dark:bg-zinc-700 rounded-md absolute bg-white w-full ${className}`}
        >
            {datas.map(item => (
                <li 
                    key={item}
                    onClick={()=>hanldeClick(item)}
                    className="px-4 py-1 cursor-pointer dark:text-slate-200 mb-2 rounded-md hover:bg-gray-50"
                >
                    {item}
                </li>
            ))}
            
        </ul>
    )
}

