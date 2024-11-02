import { Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler"
import { JobApplication, JobApplicationT } from "../models/jobApplication.model"
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors"
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
//only for admin
const updateApplicationStatus = asyncHandler(async (req:Request, res:Response)=>{
    const {applicationId} = req.params
    const application = await JobApplication.findOneAndUpdate(
        {_id: applicationId},
        {$set: {status: req.body.status}},
        {runValidators: true}
    )
    if (!application){
        throw new NotFoundError(`Application with id ${applicationId} does not exists`)
    }
    
    res.status(statusCodes.OK).json(
        new ApiResponse(
            statusCodes.OK,
            {},
            "Application status is updated successfully"
        )
    )
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
            {data: jobApplications, pages, total},
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
    deleteJobApplication
}