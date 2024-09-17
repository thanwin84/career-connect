import asyncHandler from '../utils/asyncHandler.js'
import { Country } from '../models/country.model.js'



const getCountryList = asyncHandler(async (req, res)=>{
    const countries = await Country.find()

    res.status(200).json({data: countries})
})

const getCityList = asyncHandler(async (req, res)=>{
    const {countryId} = req.params
    const cities = await Country.findById(countryId)

    res.status(200).json({data: cities})
})

export {
    getCountryList,
    getCityList
}