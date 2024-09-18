import asyncHandler from '../utils/asyncHandler.js'
import {statusCodes} from '../utils/constants.js'
import {User} from '../models/user.model.js'
import { Job } from '../models/job.model.js'
import {deleteAsset, uploadOnCloudinary} from '../utils/cloudinary.js'
import {BadRequestError} from '../errors/customErrors.js'

 const getCurrentUser = asyncHandler(async (req, res)=>{
   console.log(req.user)
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
   
   const localFilePath = req?.file?.path
   if (localFilePath){
      const updatedAvatarPath = await uploadOnCloudinary(localFilePath)
      if (oldAvatarPublicId){
         await deleteAsset(oldAvatarPublicId)
      
      }
      obj.avatar = [updatedAvatarPath.url, updatedAvatarPath.public_id]
   }
    
   await User.findByIdAndUpdate(
        req.user.userId,
        obj
    )
    res.status(statusCodes.OK).json({msg: "updated User"})
 })

 const uploadPhoto = asyncHandler(async (req, res)=>{
   const {userId} = req.params
   const localFilePath = req?.file?.path
   console.log(req.file)
   const user = await User.findById(userId)
   if (localFilePath){
      const uploadedPhoto = await uploadOnCloudinary(localFilePath)
      user.avatar = [uploadedPhoto.url, uploadedPhoto.public_id]
   }
   await user.save()
   res.status(statusCodes.OK).json({message: "Photo has been updated", user})
 })

 
 const addEducation = asyncHandler(async(req, res)=>{
   const userId = req.user.userId
   const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {$push: {educationRecords: req.body}}
   )
   res.status(statusCodes.OK).json({msg: "education record is updated"})
 })
 
 const deleteEducationEntry = asyncHandler(async (req, res)=>{
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

const updateEducationEntry = asyncHandler(async (req, res)=>{
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
 const toggleAccessStatus = asyncHandler(async (req, res)=>{
   
   const {userId} = req.params
   if (!userId){
      throw new BadRequestError("User id is missing")
   }
   const user = await User.findById(userId)
   user.accessStatus = !user.accessStatus
   await user.save()
   res.status(statusCodes.OK).json({message: "User access status has been updated."})
 })

 const getUsersList = asyncHandler(async (req, res)=>{
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
   const totalPages = Math.ceil(usersCount / limit)

   res.status(statusCodes.OK).json({users, totalPages, usersCount})
 })

const addPhoneNumber = asyncHandler(async (req, res)=>{
   const {phoneNumber} = req.body
   console.log("running")
   if (!phoneNumber){
      throw new BadRequestError("Phone number is missing")
   }
   const user = await User.findById(req.user.userId)
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