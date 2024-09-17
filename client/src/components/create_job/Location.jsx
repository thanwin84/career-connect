import {useEffect, useState} from "react";
import {ComboBox} from '../ui'
import { useFormContext } from "react-hook-form";

export default function Location({
    countries: datas, 
    className,
    country,
    jobLocation
}){
    
    const [countries, setCountries] = useState(datas.map(item=>item.name))
    const [filteredCountry, setFilterCountry] = useState(countries)
    const [cities, setCities] = useState([])
    const [fileteredCities, setFilterCities] = useState([])
    const {register, setValue, formState, trigger} = useFormContext()

    
    function filterList(list, searchTerm){
        const filteredList = list?.filter(item => item.toLowerCase().startsWith(searchTerm.toLowerCase()))
        return filteredList 
    }
    function handleCountryOnChange(value){
        setValue("country", "")
        trigger("country")
        setFilterCountry(filterList(countries, value))
    }
    function handleCityChange(value){
        setValue("jobLocation", '')
        trigger("jobLocation")
        setFilterCities(filterList(cities, value))
    }

    function getSelectedOption(value){
        const country = datas.find(item => item.name.toLowerCase() === value.toLowerCase())
        const cities = country.cities.map(item => item.name)
        setCities(cities)
        setFilterCities(cities)
        setValue("country", value)
        trigger("country")
    }

    function getSelectedCity(value){
        setValue("jobLocation", value)
        trigger("jobLocation")
    }
    
    useEffect(()=>{
        register("country", {required:"Please select a country"})
        register("jobLocation", {required: "Please select a city"})
        if (country && jobLocation){
            setValue('country', country)
            setValue('jobLocation',jobLocation)
        }
    },[])

   
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
                errorMessage={formState.errors.country?.message}
            />
            <ComboBox
                key="city"
                label="City"
                name='jobLocation'
                datas={fileteredCities}
                defaultValue={jobLocation}
                onChange={handleCityChange}
                getSelectedOption={getSelectedCity}
                errorMessage={formState.errors.jobLocation?.message}
            />
        </div>
    )
}