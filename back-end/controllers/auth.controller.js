import asyncHandler from '../utils/asyncHandler.js'
import {JOB_SORT_BY, statusCodes} from '../utils/constants.js'
import {User} from '../models/user.model.js'
import {Job} from "../models/job.model.js"
import twilioService from '../third party/twillioService.js'
import { 
   
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
 } from '../errors/customErrors.js'
 import { uploadOnCloudinary } from '../utils/cloudinary.js'

const register = asyncHandler(async(req, res)=>{
    
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount ? 'admin': "user"
    const userExists = await User.findOne({email: req.body.email})
    if (userExists){
        throw new BadRequestError("User is already registered")
    }
    const localFilePath = req?.file?.path 
    if (localFilePath){
        const uploadResponse = await uploadOnCloudinary(localFilePath)
        req.body.avatar = [uploadResponse.url, uploadResponse.public_id]
    }
    const user = (await User.create(req.body))

    res.status(statusCodes.CREATED).json({msg: "user is created successfully", userId: user._id})
})

const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    if (!user){
        throw new NotFoundError("user does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid){
        throw new UnauthenticatedError('invalid credentials')
    }
    if (!user.accessStatus){
        throw new UnauthenticatedError("Access Denied")
    }
    
    const token = user.generateToken()

    const oneDay = 1000 * 60 * 60 * 24
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + oneDay),
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'

    }
    user.password = null
    res.status(statusCodes.OK)
    .cookie('token', token, options)
    .json({msg: 'User is logged in successfully', data: user})
    
})

const logout = asyncHandler(async (req, res)=>{
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(statusCodes.OK)
    .clearCookie("token", options)
    .json({msg: "user is logged out successfully"})
})

const changePassword = asyncHandler(async (req, res)=>{
    const {oldPassword, newPassword} = req.body
    
    const user = await User.findById(req.user.userId)
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
    const user = await User.findById(userId)
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials') 
    }
    res.status(statusCodes.OK).json({message: "your password is correct"})
})

const toggleTwoStepAuthentication = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user.userId)
    if (!user){
        throw new NotFoundError(`user with id ${req.user.id} not found`)
    }
    user.twoStepAuthentication = !user.twoStepAuthentication
    await user.save()
    res.status(statusCodes.OK).json({message: "two step authentican is updated."})
})

const sendVerificationCode = asyncHandler(async (req, res)=>{
    const {phoneNumber, channel} = req.body
    
    const response = await twilioService.sendVerificationToken(phoneNumber, channel)
    
    res.status(statusCodes.OK).json({message: "Verification code has been sent"})
})

const verifyVerificationCode = asyncHandler(async (req, res)=>{
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

const deleteAccount = asyncHandler(async (req, res)=>{
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