import twilioService from '../third party/twillioService'
import asyncHandler from '../utils/asyncHandler'
import {Request, Response} from 'express'
import { statusCodes } from '../utils/constants'
import { BadRequestError } from '../errors/customErrors'

const sendVerificationCode = asyncHandler(async (req:Request, res:Response)=>{
    const {phoneNumber, channel} = req.body
    
    await twilioService.sendVerificationToken(phoneNumber, channel)
    
    res.status(statusCodes.OK).json({message: "Verification code has been sent"})
})

const verifyVerificationCode = asyncHandler(async (req:Request, res:Response)=>{
    const {code, phoneNumber} = req.body
    if (!code && !phoneNumber){
        throw new BadRequestError("both code and phone is required")
    }
    const response = await twilioService.verificationCheck(phoneNumber, code)
    if (response === 'approved'){
        res.status(statusCodes.OK).json({message: "user has been approved", data: response})
    }
    res.status(statusCodes.OK).json({message: "wrong code", data: response})
})
export {
    sendVerificationCode,
    verifyVerificationCode
}