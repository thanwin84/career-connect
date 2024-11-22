import { Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler"
import { JobApplication, JobApplicationT } from "../models/jobApplication.model"
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "../errors/customErrors"
import { statusCodes } from "../utils/constants"
import mongoose from "mongoose"
import { ApiResponse } from "../utils/ApiResponse"

const apply = asyncHandler(async(req:Request, res:Response)=>{
    const {_id} = req.body
    const appliction = await JobApplication.findById(_id)
    if (appliction){
        throw new BadRequestError(`Application with id ${_id} already exists`)
    }
    const newApplication = await JobApplication.create(req.body)
    res.status(statusCodes.CREATED)
    .json(new ApiResponse(
        statusCodes.CREATED,
        {jobApplication: newApplication}
    ))
})

const updateApplicationStatus = asyncHandler(async (req:Request, res:Response)=>{
    const {applicationId} = req.params
    const application = await JobApplication.findById(applicationId)
    if (!application){
        throw new NotFoundError(`Application with id ${applicationId} does not exists`)
    }
    // only recruiter can modify the application 
    if (application.recruiterId.toString() !== req.user.userId){
        throw new ForbiddenError("You are not allowed to modify the application status")
    }
    application.status = req.body.status
    await application.save()
    
    res.status(statusCodes.OK).json(
        new ApiResponse(
            statusCodes.OK,
            {},
            "Application status is updated successfully"
        )
    )
})

const updateManyApplicationStatus = asyncHandler(async (req:Request, res:Response)=>{
    const {applicationIds} = req.query
    const {status} = req.body
    
    const queryObject:any = {}
    if (applicationIds && Array.isArray(applicationIds)){
        queryObject._id = {$in: applicationIds}
    }
    const {modifiedCount} = await JobApplication.updateMany(
        queryObject, 
        {$set: {status: status}}, 
        {runValidators: true}
    )
    res.status(statusCodes.OK)
    .json(new ApiResponse(
        statusCodes.OK,
        {},
        `${modifiedCount} applications updated successfully`
    ))
})
const getAllJobApplications = asyncHandler(async (req:Request, res:Response)=>{
    const {limit=10, page=1, status, candidateId, recruiterId, sort} = req.query
    const skips = (Number(page) -1) * Number(limit)
    const queryObject:any = {}
    const sortOptions = {
        latest: {createdAt: -1},
        old: {createdAt: 1}
    } as const
    if (status) queryObject.status = status
    if (candidateId) queryObject.candidateId = new mongoose.Types.ObjectId(candidateId as string)
    if (recruiterId) queryObject.recruiterId = new mongoose.Types.ObjectId(recruiterId as string)
    
    const jobApplications = await JobApplication.aggregate([
        {
            $match: queryObject
        },
        {
            $sort: sortOptions[sort as keyof typeof sortOptions] || sortOptions['latest']
        },
        {
            $skip: skips
        },
        {
            $limit: Number(limit)
        }
    ])
    const total = await JobApplication.countDocuments(queryObject)
    const pages = Math.ceil(total / Number(limit))
    res.status(statusCodes.OK)
    .json(
        new ApiResponse(
            statusCodes.OK,
            {jobApplications, pages, total},
            "All jobs are fetched successfully"
        )
    )

})
const getMyApplications = asyncHandler(async (req:Request, res:Response)=>{
    const {limit=10, page=1, sort, status} = req.query
    const skips = (Number(page) -1) * Number(limit)
    const queryObject:any = {candidateId: new mongoose.Types.ObjectId(req.user.userId)}
    if (status) queryObject.status = status
    const sortOptions = {
        latest: {createdAt: -1},
        old: {createdAt: 1}
    } as const
    const jobApplications:JobApplicationT[] = await JobApplication.aggregate([
        {
            $match: queryObject
        },
        {
            $sort: sortOptions[sort as keyof typeof sortOptions] || sortOptions['latest']
        },
        {
            $skip: skips
        },
        {
            $limit: Number(limit)
        }
    ])
    const total = await JobApplication.countDocuments(queryObject)
    const pages = Math.ceil(total / Number(limit))
    res.status(statusCodes.OK)
    .json(
        new ApiResponse(
            statusCodes.OK,
            {data: jobApplications, pages, total},
            "All your applications are fetched successfully"
        )
    )
})
const getJobApplication = asyncHandler(async (req:Request, res:Response)=>{
    const {applicationId} = req.params
    const jobApplication = await JobApplication.findById(applicationId)
    if (!jobApplication){
        throw new BadRequestError(`Job application with id ${applicationId} is not found`)
    }
    res.status(statusCodes.OK)
    .json(new ApiResponse(
        statusCodes.OK,
        {jobApplication},
        `Applicaiton with id ${applicationId} is fetched successfully`
    ))
})

const deleteJobApplication = asyncHandler(async (req:Request, res:Response)=>{
    const {applicationId} = req.params
    const jobApplication = await JobApplication.findById(applicationId)
    if (!jobApplication){
        throw new NotFoundError(`Job application with id ${applicationId} is not found`)
    }
    if (req.user.role === 'admin' || jobApplication.recruiterId === req.user.userId){
        
        await JobApplication.deleteOne({_id: applicationId})
    }
    else {
        throw new UnauthorizedError("you are not allowed to perform to delete")
    }

    res.status(statusCodes.OK).json(
        new ApiResponse(
            statusCodes.OK,
            {},
            "Application is deleted successfully"
        )
    )
})


export {
    apply,
    updateApplicationStatus,
    getAllJobApplications,
    getJobApplication,
    getMyApplications,
    deleteJobApplication,
    updateManyApplicationStatus
}