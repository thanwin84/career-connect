import asyncHandler from '../utils/asyncHandler'
import {Job} from '../models/job.model'
import {statusCodes, JOB_SORT_BY} from '../utils/constants'
import { 
    NotFoundError,
    BadRequestError
 } from '../errors/customErrors'
import mongoose from 'mongoose'
import day from "dayjs"
import { Request, Response} from 'express'
import { Stats } from '../types'
import { JobApplication } from '../models/jobApplication.model'

const getAllJobsCreatedByUser = asyncHandler(async (req:Request, res:Response)=>{
    const {limit=10, page=1, search, jobStatus, jobType, sort} = req.query
    
    const skips = (Number(page) - 1) * Number(limit)
    

    const queryObject:any = req.user.role === 'admin' ? {} : {createdBy: new mongoose.Types.ObjectId(req.user.userId)}
    if (search){
        queryObject.$or = [
            {position: {$regex: search, $options: "i"}},
            {company: {$regex: search, $options: "i"}}
        ]
    }
    if (jobStatus && jobStatus !== "all"){
        queryObject.jobStatus = jobStatus
    }
    if (jobType && jobType !== "all"){
        queryObject.jobType = jobType
    }
    const sortOptions = {
        newest: {"createdAt": -1},
        oldest: {"createdAt": 1},
        "a-z": {"position": 1},
        "z-a": {"position": -1}
    } 
    const sortKey = sortOptions[sort as keyof typeof sortOptions] || sortOptions["newest"]
    
   
    const aggregationPipeline:any = [
        {
            $match: queryObject
        },
        {
            $sort: sortKey
        },
        {
            $skip: skips
        },
        {
            $limit: Number(limit)
        }
    ]
    const jobs = await Job.aggregate(aggregationPipeline)
    const totalJobs = await Job.countDocuments(queryObject)
    const totalPages = Math.ceil(totalJobs / Number(limit))

    res.status(statusCodes.OK).json({totalJobs, totalPages, currentPage: page, jobs})
})

const getJobs = asyncHandler(async (req:Request, res:Response)=>{
    const {
        page = 1, 
        limit = 10, 
        jobType, 
        sort, 
        location, 
        search,
        minSalary,
        maxSalary,
        experianceLevel
    } = req.query
    const skips = (Number(page) - 1) * (Number(limit))
    const queryObject:any = {}

    const addConditions = []
    

    if (location) {
            addConditions.push({
                $or: [
                    {jobLocation: {$regex: location, $options: "i"}},
                    {country: {$regex: location, $options: 'i'}}
                ]
            })
    }
    if (search) {
        addConditions.push({
            $or: [
                {position: {$regex: search, $options: 'i'}},
                {company: {$regex: search, $options: 'i'}}
            ]
        })
    } 
    if (addConditions.length > 0){
        queryObject.$and = addConditions
    }
    
    const sortOptions = {
        newest: {"createdAt": -1},
        oldest: {"createdAt": 1},
        "a-z": {"position": 1},
        "z-a": {"position": -1}
    }
    const sortKey = sortOptions[sort as keyof typeof sortOptions] || sortOptions["newest"]
    if (minSalary || maxSalary){
        queryObject['salary.min'] = minSalary ? {$gte: Number(minSalary)}: {$gte: 0},
        queryObject['salary.max'] = maxSalary ? {$lte: Number(maxSalary)} : {$lte: Number.MAX_SAFE_INTEGER}
    }
    if (jobType && Array.isArray(jobType)){
        queryObject.jobType = {$in: jobType}
    }
    if (experianceLevel && Array.isArray(experianceLevel)){
        queryObject.experianceLevel = {$in: experianceLevel}
    }
    if (req.user.userId){
        const applicationIds = (await JobApplication.find({candidateId: req.user.userId})).map(application=> application.jobId)
        queryObject._id = {$nin: applicationIds }
    }
    
    const aggregationPipeline:any = [
        {
            $match: queryObject
        },
        {
            $sort: sortKey
        },
        {
            $skip: skips
        },
        {$limit: Number(limit)}
    ]
    const jobs = await Job.aggregate(aggregationPipeline)
    const jobsCount = await Job.countDocuments(queryObject)
    const totalPages = Math.ceil(jobsCount / Number(limit)) 

    
    res.status(statusCodes.OK).json({
        jobs,
        jobsCount,
        totalPages,
        page
    })

})

const createJob = asyncHandler(async (req:Request, res:Response)=>{
    req.body.createdBy = req.user.userId
   
    const job = await Job.create(req.body)

    res.status(statusCodes.CREATED).json({job})
}) 

const getJob = asyncHandler(async (req:Request, res:Response)=>{
    const {id} = req.params
    
    const job = await Job.findById(id)
    
    if (!job){
        throw new NotFoundError(`No job with id ${id}`)
    }
    res.status(statusCodes.OK).json({job:job})
})

const updateJob = asyncHandler(async (req:Request, res:Response)=>{
    
    const {id} = req.params
    
    const job = await Job.findByIdAndUpdate(
        id,
        {$set: req.body},
        {new: true}
    )
    if (!job){
        throw new NotFoundError(`No job with id ${id}`)
    }
    res.status(statusCodes.OK).json({mgs: `Job modified:`, job})
})

const deleteJob = asyncHandler(async (req:Request, res:Response)=>{
    const {id} = req.params
    if (!id){
        throw new BadRequestError("Id is missing")
    }
    const job = await Job.findOneAndDelete({_id: id})
    if (!job){
        throw new NotFoundError(`No job with id ${id}`)
    }
    
    res.status(statusCodes.OK).json({msg: "job deleted"})
})

const showStats = asyncHandler(async (req:Request, res:Response)=>{
    let stats = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: "$jobStatus",
                count: {$sum: 1}
            }
        }
    ])
    const statsValues = stats.reduce<Stats>((acc, curr)=>{
        const {_id:title, count} = curr
        acc[title as keyof Stats] = count
        return acc
    }, {interview: 0, pending: 0, declined: 0})
    
    const defaultStats:Stats = {
        pending: statsValues.pending || 0,
        interview: statsValues.interview || 0,
        declined: statsValues.declined || 0
    }
    let monthlyApplications = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $addFields: {
                createdAt: {$toDate: "$createdAt"}
            }
        },
        {
            $group: {
                _id: {
                    year: {$year: "$createdAt"},
                    month: {$month: "$createdAt"}
                },
                count: {$sum: 1}
            }
        },
        {
            $sort: {"_id.year": -1, "_id:month": -1}
        },
        {
            $limit: 6
        }
    ])
    monthlyApplications = monthlyApplications.map(item =>{
        const {_id:{year, month}, count} = item
        const date = day().year(year).month(month -1).format("MMM YY")
        return {date, count}
    }).reverse()

    res.status(statusCodes.OK).json({defaultStats, monthlyApplications})
})

export {
    getAllJobsCreatedByUser,
    createJob,
    getJob,
    updateJob,
    deleteJob,
    showStats,
    getJobs
}