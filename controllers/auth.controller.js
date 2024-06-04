import asyncHandler from '../utils/asyncHandler.js'
import {statusCodes} from '../utils/constants.js'
import {User} from '../models/user.model.js'
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

export {
    register,
    login,
    logout
}