import React, {useState} from "react";
import {SearchInput} from '..'


export default function Location({
    countries, 
    className,
    country,
    jobLocation
}){
    const [cities, setCities] = useState([])
    const [isCityActive, setIsCityActive] = useState(true)
    
    async function handleCountryClickDropDown(value){
        setCities(value.cities)
        setIsCityActive(false)
        
       
    }
    
    return (
        <div className={`flex gap-4 ${className}`} >
            <SearchInput
                label="Country"
                name="country"
                datas={countries}
                onDropDownClick={handleCountryClickDropDown}
                defaultValue={country}
            />
            <SearchInput 
                label="City"
                name='jobLocation'
                datas={cities}
                disabled={isCityActive}
                defaultValue={jobLocation}
            />
        </div>
    )
}