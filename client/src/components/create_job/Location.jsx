import React, {useEffect, useState} from "react";
import {ComboBox} from '../ui'
import { debounce } from "../../utils";

export default function Location({
    countries: datas, 
    className,
    country,
    jobLocation
}){
    const [countries, setCountries] = useState(datas.map(item=>item.name))
    const [filteredCountry, setFilterCountry] = useState(countries)
    const [selectedCountry, setSelectedCountry] = useState("")
    const [cities, setCities] = useState([])
    const [fileteredCities, setFilterCities] = useState([])
    function filterList(list, searchTerm){
        const filteredList = list?.filter(item => item.toLowerCase().startsWith(searchTerm.toLowerCase()))
        return filteredList
    }
    function handleCountryOnChange(value){
        setFilterCountry(filterList(countries, value))
    }
    function handleCityChange(value){
        setFilterCities(filterList(cities, value))
    }

    function getSelectedOption(value){
        setSelectedCountry(value)
        const country = datas.find(item => item.name.toLowerCase() === value.toLowerCase())
        const cities = country.cities.map(item => item.name)
        setCities(cities)
        setFilterCities(cities)
    }
    
    
    return (
        <div className={`flex gap-4 ${className}`} >
            <ComboBox
                key="country"
                label="Country"
                name="country"
                datas={filteredCountry}
                defaultValue={country}
                onChange={handleCountryOnChange}
                getSelectedOption={getSelectedOption}
            />
            <ComboBox
                key="city"
                label="City"
                name='jobLocation'
                datas={fileteredCities}
                defaultValue={jobLocation}
                onChange={handleCityChange}
            />
        </div>
    )
}