import asyncHandler from '../utils/asyncHandler.js'
import {Job} from '../models/job.model.js'
import { nanoid } from 'nanoid'



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
    res.status(200).json({jobs})
})

const createJob = asyncHandler(async (req, res)=>{
    const {company, position} = req.body
    if (!company || !position){
        return res.status(400).json({msg: "All feilds are required"})
    }
   
    const job = await Job.create({company, position})

    res.status(201).json({job})
})

const getJob = asyncHandler(async (req, res)=>{
    const {id} = req.params
    const job = await Job.findById(id)
    if (!job){
        return res.status(404).json({msg: `No job with id ${id}`})
    }
    res.status(200).json({job})
})

const updateJob = asyncHandler(async (req, res)=>{
    const {company, position} = req.body
    if (!company && !position){
        return res.status(400).json("msg: at least one field is required")
    }
    const {id} = req.params
    
    const job = await Job.findByIdAndUpdate(
        id,
        {$set: req.body},
        {new: true}
    )
    if (!job){
        return res.status(404).json({msg: `No job with id ${id}`})
    }
    res.status(200).json({mgs: `Job modified:`, job})
})

const deleteJob = asyncHandler(async (req, res)=>{
    const {id} = req.params
    const job = await Job.findOneAndDelete({_id: id})
    if (!job){
        return res.status(404).json({msg: `No job with id ${id}`})
    }
    
    res.status(200).json({msg: "job deleted"})
})

export {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}