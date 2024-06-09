import asyncHandler from '../utils/asyncHandler.js'
import {Job} from '../models/job.model.js'
import {statusCodes} from '../utils/constants.js'
import { 
    NotFoundError,
    BadRequestError
 } from '../errors/customErrors.js'
import mongoose from 'mongoose'
import day from "dayjs"

const getAllJobs = asyncHandler(async (req, res)=>{
    const {limit=10, page=1} = req.query
    
    const skips = (Number(page) - 1) * Number(limit)

    const aggregationPipeline = [
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $skip: skips
        },
        {
            $limit: Number(limit)
        }
    ]
    const jobs = await Job.aggregate(aggregationPipeline)
    res.status(statusCodes.OK).json({jobs})
})

const createJob = asyncHandler(async (req, res)=>{
    req.body.createdBy = req.user.userId
   
    const job = await Job.create(req.body)

    res.status(statusCodes.CREATED).json({job})
})

const getJob = asyncHandler(async (req, res)=>{
    const {id} = req.params
    
    const job = await Job.findById(id)
    console.log(job)
    if (!job){
        throw new NotFoundError(`No job with id ${id}`)
    }
    res.status(statusCodes.OK).json({job})
})

const updateJob = asyncHandler(async (req, res)=>{
    const {company, position} = req.body
    if (!company && !position){
        throw new BadRequestError("At least one field is required")
    }
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

const deleteJob = asyncHandler(async (req, res)=>{
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

const showStats = asyncHandler(async (req, res)=>{
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
    stats = stats.reduce((acc, curr)=>{
        const {_id:title, count} = curr
        acc[title] = count
        return acc
    }, {})
    
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
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
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
    showStats
}