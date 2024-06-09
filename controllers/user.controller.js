import asyncHandler from '../utils/asyncHandler.js'
import {statusCodes} from '../utils/constants.js'
import {User} from '../models/user.model.js'
import { Job } from '../models/job.model.js'
import {deleteAsset, uploadOnCloudinary} from '../utils/cloudinary.js'
import {BadRequestError} from '../errors/customErrors.js'

 const getCurrentUser = asyncHandler(async (req, res)=>{
    const {userId} = req.user
    const user = await User.findById(userId).select("-password")
    res.status(statusCodes.OK).json(user)
 })

 const getApplicationStats = asyncHandler(async (req, res)=>{
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()

    res.status(statusCodes.OK).json({users, jobs})
 })

 const updateUser = asyncHandler(async (req, res)=>{
   
    const user = await User.findOne({email: req.body.email})
    if (user && user._id.toString() !== req.user.userId){
        throw new BadRequestError("email already exists")
    }
    const obj = {...req.body}
    delete obj.password
    const oldAvatarPublicId = user?.avatar[1]
    if (oldAvatarPublicId){
      await deleteAsset(oldAvatarPublicId)
     
    }
    const localFilePath = req?.file?.path
    if (localFilePath){
      const updatedAvatarPath = await uploadOnCloudinary(localFilePath)
      obj.avatar = [updatedAvatarPath.url, updatedAvatarPath.public_id]
    }
    
    const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        obj
    )
    res.status(statusCodes.OK).json({msg: "updated User"})
 })

 export {
    getCurrentUser,
    getApplicationStats,
    updateUser
 }