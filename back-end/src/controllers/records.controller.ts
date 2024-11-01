import asyncHandler from '../utils/asyncHandler'
import { Country } from '../models/country.model'
import { Request, Response } from 'express'



const getCountryList = asyncHandler(async (req:Request, res:Response)=>{
    const countries = await Country.find()

    res.status(200).json({data: countries})
})

const getCityList = asyncHandler(async (req:Request, res:Response)=>{
    const {countryId} = req.params
    const cities = await Country.findById(countryId)

    res.status(200).json({data: cities})
})

export {
    getCountryList,
    getCityList
}