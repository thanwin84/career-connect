import asyncHandler from '../utils/asyncHandler.js'
import { nanoid } from 'nanoid'

// temporary
let jobs = [
    {id:nanoid(), company: "Apple", position: "front-end"},
    {id: nanoid(), company: "Google", position: "front-end"}
]


const getAllJobs = asyncHandler(async (req, res)=>{
    res.status(200).json({jobs})
})

const createJob = asyncHandler(async (req, res)=>{
    const {company, position} = req.body
    if (!company || !position){
        return res.status(400).json({msg: "All feilds are required"})
    }
    const id = nanoid(10)
    const job = {id, company, position}
    jobs.push(job)
    res.status(201).json({job})
})

const getJob = asyncHandler(async (req, res)=>{
    const {id} = req.params
    const job = jobs.find(job => job.id === id)
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
    const job = jobs.find(job => job.id === id)
    if (!job){
        return res.status(404).json({msg: `No job with id ${id}`})
    }
    job.company = company
    job.position = position
    res.status(200).json({mgs: `Job modified:`, job})
})

const deleteJob = asyncHandler(async (req, res)=>{
    const {id} = req.params
    const job = jobs.find(job => job.id === id)
    if (!job){
        return res.status(404).json({msg: `No job with id ${id}`})
    }
    const newJobs = jobs.filter(job => job.id !== id)
    jobs = newJobs
    res.status(200).json({msg: "job deleted"})
})

export {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}