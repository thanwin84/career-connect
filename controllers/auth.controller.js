import asyncHandler from '../utils/asyncHandler.js'
import {statusCodes} from '../utils/constants.js'
import {User} from '../models/user.model.js'
import twilioService from '../third party/twillioService.js'
import { 
   
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
 } from '../errors/customErrors.js'

const register = asyncHandler(async(req, res)=>{
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount ? 'admin': "user"
    const userExists = await User.findOne({email: req.body.email})
    if (userExists){
        throw new BadRequestError("User is already registered")
    }
    const user = await User.create(req.body)
    res.status(statusCodes.CREATED).json({msg: "user is created successfully"})
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
    const token = user.generateToken()

    const oneDay = 1000 * 60 * 60 * 24
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + oneDay)

    }

    res.status(statusCodes.OK)
    .cookie('token', token, options)
    .json({msg: 'User is logged in successfully'})
    
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
    const isPasswordValid = user.isPasswordCorrect(oldPassword)
    if (!isPasswordValid){
        throw new BadRequestError("Your current is incorrect")
    }
    user.password = newPassword
    await user.save()
    res.status(statusCodes.OK).json({message: "Your password has been changed successfully"})
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

export {
    register,
    login,
    logout,
    toggleTwoStepAuthentication,
    sendVerificationCode,
    verifyVerificationCode,
    changePassword
}