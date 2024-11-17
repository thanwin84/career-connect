import asyncHandler from '../utils/asyncHandler'
import {statusCodes} from '../utils/constants'
import {User, UserDocument} from '../models/user.model'
import {Job} from "../models/job.model"
import twilioService from '../third party/twillioService'
import { 
   
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
 } from '../errors/customErrors'
 import { uploadOnCloudinary } from '../utils/cloudinary'
import { Request, Response, CookieOptions } from 'express'

declare module "express-serve-static-core" {
    interface Response {
        cookie(name: string, value: string, options?: CookieOptions): this;
    }
}

const register = asyncHandler(async(req:Request, res:Response)=>{
    
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount ? 'admin': "user"
    const userExists = await User.findOne({email: req.body.email})
    if (userExists){
        throw new BadRequestError("User is already registered")
    }
    const localFilePath = req?.file?.path 
    if (localFilePath){
        const uploadResponse = await uploadOnCloudinary(localFilePath)
        if (uploadResponse){
            req.body.avatar = [uploadResponse.url, uploadResponse.public_id]
        }
    }
    const user = (await User.create(req.body))

    res.status(statusCodes.CREATED).json({msg: "user is created successfully", userId: user._id})
})

const login = asyncHandler(async(req:Request, res:Response)=>{
    const {email, password} = req.body
    const user:UserDocument | null = await User.findOne({email: email})
    if (!user){
        throw new NotFoundError("user does not exist")
    }
    const isPasswordValid = user.isPasswordCorrect(password)
    if (!isPasswordValid){
        throw new UnauthenticatedError('invalid credentials')
    }
    if (!user.accessStatus){
        throw new UnauthenticatedError("Access Denied")
    }
    
    const token = user.generateToken()

    const oneDay = 1000 * 60 * 60 * 24
    const options:CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + oneDay),
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'

    }
    user.password = ""
    res.status(statusCodes.OK)
    .cookie('token', token, options)
    .json({msg: 'User is logged in successfully', data: user})
    
})

const logout = asyncHandler(async(req:Request, res:Response)=>{
    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }
    const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      };
    res
    .status(statusCodes.OK)
    .clearCookie("token", options)
    .json({msg: "user is logged out successfully"})
})

const changePassword = asyncHandler(async (req, res)=>{
    const {oldPassword, newPassword} = req.body
    
    const user:UserDocument | null = await User.findById(req.user.userId)
    if (!user){
        throw new NotFoundError(`User with id ${req.user.userId} not found`)
    }
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordValid){
        throw new BadRequestError("Your current password is incorrect")
    }
    user.password = newPassword
    await user.save()
    res.status(statusCodes.OK).json({message: "Your password has been changed successfully"})
})

const reEnterPassword = asyncHandler(async (req, res)=>{
    const userId = req.user.userId
    const {password} = req.body
    if (!password){
        throw new BadRequestError("Password feild is required")
    }
    const user:UserDocument | null = await User.findById(userId)
    if (!user){
        throw new NotFoundError(`User with id ${req.user.userId} not found`)
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials') 
    }
    res.status(statusCodes.OK).json({message: "your password is correct"})
})

const toggleTwoStepAuthentication = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user.userId)
    if (!user){
        throw new NotFoundError(`user with id ${req.user.userId} not found`)
    }
    user.twoStepAuthentication = !user.twoStepAuthentication
    await user.save()
    res.status(statusCodes.OK).json({message: "two step authentican is updated."})
})

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

const deleteAccount = asyncHandler(async (req:Request, res:Response)=>{
    const userId = req.user.userId
    // delete the account
    await User.deleteOne({_id: userId})
    // delete all jobs created by this user
    await Job.deleteMany({createdBy: userId})
    res.status(200).json({message: "Your account has been deleted"})

})

export {
    register,
    login,
    logout,
    toggleTwoStepAuthentication,
    sendVerificationCode,
    verifyVerificationCode,
    changePassword,
    reEnterPassword,
    deleteAccount
}