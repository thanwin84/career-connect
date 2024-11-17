import asyncHandler from '../utils/asyncHandler'
import {statusCodes} from '../utils/constants'
import {User} from '../models/user.model'
import { Job } from '../models/job.model'
import {deleteAsset, uploadOnCloudinary} from '../utils/cloudinary'
import {BadRequestError, NotFoundError} from '../errors/customErrors'
import { Request, Response } from 'express'

 const getCurrentUser = asyncHandler(async (req:Request, res:Response)=>{
    const {userId} = req.user
    const user = await User.findById(userId).select("-password")
    res.status(statusCodes.OK).json(user)
 })

 const getApplicationStats = asyncHandler(async (req:Request, res:Response)=>{
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments() 

    res.status(statusCodes.OK).json({users, jobs})
 })

 const updateUser = asyncHandler(async (req:Request, res:Response)=>{
   
   const user = await User.findOne({email: req.body.email})
   if (user && user._id.toString() !== req.user.userId){
      throw new BadRequestError("email already exists")
   }
   const obj = {...req.body}
   delete obj.password
   const oldAvatarPublicId = user?.avatar[1]
   
   const localFilePath = req?.file?.path
   if (localFilePath){
      const updatedAvatarPath = await uploadOnCloudinary(localFilePath)
      if (oldAvatarPublicId){
         await deleteAsset(oldAvatarPublicId)
      
      }
      if (updatedAvatarPath){
         obj.avatar = [updatedAvatarPath.url, updatedAvatarPath.public_id]
      }
   }
    
   await User.findByIdAndUpdate(
        req.user.userId,
        obj
    )
    res.status(statusCodes.OK).json({msg: "updated User"})
 })

 const uploadPhoto = asyncHandler(async (req:Request, res:Response)=>{
   const localFilePath = req?.file?.path
   const user = await User.findById(req.user.userId)
   if (!user){
      throw new NotFoundError(`User with id ${req.user.userId} is not found`)
   }
   if (localFilePath){
      const uploadedPhoto = await uploadOnCloudinary(localFilePath)
      const oldPhotoId = user.avatar[1]
      user.avatar = uploadedPhoto ? [uploadedPhoto.url, uploadedPhoto.public_id]: []
      await deleteAsset(oldPhotoId)
   }
   await user.save()
   res.status(statusCodes.OK).json({message: "Photo has been updated", user})
 })

 
 const addEducation = asyncHandler(async(req:Request, res:Response)=>{
   const userId = req.user.userId
   const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {$push: {educationRecords: req.body}},
      {$new: true}
   )
   
   res.status(statusCodes.OK).json(
      {data: updatedUser}
   )
 })
 
 const deleteEducationEntry = asyncHandler(async (req:Request, res:Response)=>{
   const {recordId} = req.params
   if (!recordId){
      throw new BadRequestError("record id is missing")
   }
   
   const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {$pull: {educationRecords: {_id: recordId}}}
   )
   
   
   if (!updatedUser){
      throw new BadRequestError("User not found")
   }
   res.status(statusCodes.OK).json({message: "education record has been deleted successfully"})

 })

const updateEducationEntry = asyncHandler(async (req:Request, res:Response)=>{
   const {recordId} = req.params
   if (!recordId){
      throw new BadRequestError("record id is missing")
   }
   const updatedUser = await User.findOneAndUpdate(
      {_id: req.user.userId, "educationRecords._id": recordId},
      {
         "educationRecords.$": req.body
      }
   )
   if (!updatedUser){
      throw new BadRequestError("Record is not found")
   }
   res.status(statusCodes.OK).json({message: "Education record has been updated successfully"})

})

 // for admin
 const toggleAccessStatus = asyncHandler(async (req:Request, res:Response)=>{
   
   const {userId} = req.params
   if (!userId){
      throw new BadRequestError("User id is missing")
   }
   const user = await User.findById(userId)
   if (!user){
      throw new NotFoundError(`User with id ${userId} is not found`)
   }
   user.accessStatus = !user.accessStatus
   await user.save()
   res.status(statusCodes.OK).json({message: "User access status has been updated."})
 })

 const getUsersList = asyncHandler(async (req:Request, res:Response)=>{
   const {page=1, limit=10} = req.query
   const skip = (Number(page) - 1) * Number(limit)
   const users = await User.aggregate([
      {
         $sort: {"name": 1} 
      },
      {
         $skip: skip
      },
      {$limit: Number(limit)}
   ])
   const usersCount = await User.countDocuments()
   const totalPages = Math.ceil(usersCount / Number(limit))

   res.status(statusCodes.OK).json({users, totalPages, usersCount})
 })

const addPhoneNumber = asyncHandler(async (req:Request, res:Response)=>{
   const {phoneNumber} = req.body
   if (!phoneNumber){
      throw new BadRequestError("Phone number is missing")
   }
   const user = await User.findById(req.user.userId)
   if (!user){
      throw new NotFoundError(`User with id ${req.user.userId} is not found`)
   }
   user.phoneNumber = phoneNumber
   await user.save()
   res.status(statusCodes.OK).json({message: "Phone Number has been added"})
})

 export {
    getCurrentUser,
    getApplicationStats,
    updateUser,
    addEducation,
    deleteEducationEntry,
    updateEducationEntry,
    toggleAccessStatus,
    getUsersList,
    addPhoneNumber,
    uploadPhoto
 }