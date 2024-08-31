import React from "react";
import {InputWithIcon, Button} from '../..'
import { Form, useLocation, useSubmit } from "react-router-dom";
import { icons } from "../../../utils/Icons";

export default function SearchContainer({
    className,
    defaultSearch,
    defaultLocation
}){
    const submit = useSubmit()
    const {search} = useLocation()
    

    function handleSubmit(e){
        e.preventDefault()
        let params = new URLSearchParams(search)
        const formData = new FormData(e.target)
        const location = formData.get('location')
        const _search = formData.get('search')
        params.delete('location')
        params.delete('search')
        if (location){
            params.set('location', location)
        }
        if (_search){
            params.set('search', _search)
        }
        submit(params)
    }
    return (
        <Form 
            className={`w-full  lg:flex bg-white dark:bg-zinc-900 px-4 ${className}`}
            onSubmit={handleSubmit}
        >
            <div className="w-full flex flex-col lg:flex-row gap-4 px-4 py-6">
                <InputWithIcon
                    name='search'
                    icon={icons.search}
                    placeholder= "Enter job title, company name"
                    type="search"
                    defaultValue ={defaultSearch}
                />
                <InputWithIcon
                    name='location'
                    icon={icons.location}
                    placeholder= "Enter country or city name"
                    type="search"
                    defaultValue={defaultLocation}
                />
            </div>
            <div className="my-auto flex justify-end">
                <Button
                    type="submit"
                    classname= "mb-4 w-20  lg:mb-0"
                >
                    Search
                </Button>
            </div>
        </Form>
    )
}

