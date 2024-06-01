import asyncHandler from '../utils/asyncHandler.js'
import {Job} from '../models/job.model.js'
import { nanoid } from 'nanoid'
import {statusCodes} from '../utils/constants.js'
import { 
    NotFoundError,
    BadRequestError
 } from '../errors/customErrors.js'

const getAllJobs = asyncHandler(async (req, res)=>{
    const {limit=10, page=1} = req.query
    const skips = (Number(page) - 1) * Number(limit)

    const aggregationPipeline = [
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
    const {company, position} = req.body
    if (!company || !position){
        throw new BadRequestError(`All fields are required`) 
    }
   
    const job = await Job.create({company, position})

    res.status(statusCodes.CREATED).json({job})
})

const getJob = asyncHandler(async (req, res)=>{
    const {id} = req.params
    if (!id){
        throw new BadRequestError("Id is missing")
    }
    const job = await Job.findById(id)
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

export {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}