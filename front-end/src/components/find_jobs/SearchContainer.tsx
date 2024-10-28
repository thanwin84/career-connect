import {InputWithIcon, Button} from '../ui'
import { Form, useLocation, useSubmit } from "react-router-dom";
import { 
    SearchIcon, 
    LocationIcon 
} from "../../utils/Icons";
import { FormEvent } from 'react';

type Props = {
    className?: string
    defaultSearch?: string
    defaultLocation?: string

}

export default function SearchContainer({
    className,
    defaultSearch,
    defaultLocation
}:Props){
    const submit = useSubmit()
    const {search} = useLocation()
    

    function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        let params = new URLSearchParams(search)
        const formData = new FormData(e.currentTarget)
        const location = formData.get('location') as string
        const _search = formData.get('search') as string
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
                    icon={<SearchIcon />}
                    placeholder= "Enter job title, company name"
                    type="search"
                    defaultValue ={defaultSearch}
                />
                <InputWithIcon
                    name='location'
                    icon={<LocationIcon />}
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

