import {
    body,
    param,
    validationResult
} from 'express-validator'
import {BadRequestError, UnauthorizedError} from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import { Job } from '../models/job.model.js'

const withValidationError = (validateValues)=>{
    return [
        validateValues,
        (req, res, next)=>{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                const errorMessages = errors.array().map(error=> error.msg)
                if (errorMessages[0].startsWith('not authorized')){
                    throw new UnauthorizedError("not authorized to access this route")
                }
                throw new BadRequestError(errorMessages)
            }
            next()
        }
    ]
}

export const ValidateJobInput = withValidationError([
    body('company').notEmpty().withMessage("company is required"),
    body('position').notEmpty().withMessage("position is required"),
    body('jobLocation').notEmpty().withMessage("jobLocation is required"),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid job status'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type')
])

export const validateIdParam = withValidationError([
    param('id').custom((value)=> mongoose.Types.ObjectId.isValid(value))
    .withMessage("invalid mongoose id").custom(async (value, {req})=>{
        const job = await Job.findById(value)
        
        // admin can access all routes
        const isAdmin = req.user.role === 'admin'
        const isOwner = req.user.userId === job.createdBy.toString()
        
        if (!isAdmin && !isOwner){
            throw new UnauthorizedError('not authorized to access this route')
        }
    })

])

export const validateRegisterInput = withValidationError([
    body('name').notEmpty().withMessage("name is required"),
    body('email').notEmpty().withMessage("email is required").isEmail().withMessage("Email must be valid"),
    body('password').notEmpty().withMessage("password is required").isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
    body('location').notEmpty().withMessage("location is required"),
    body('lastName').notEmpty().withMessage("lastName is required")
    
])

export const validateLoginInput = withValidationError([
    body('email').notEmpty().withMessage("email is required").isEmail().withMessage("email must be valid"),
    body('password').notEmpty().withMessage("Password is required")
])

export const validateUpdateInput = withValidationError([
    body('name').notEmpty().withMessage("name is required"),
    body('email').notEmpty().withMessage("email is required").isEmail().withMessage("Email must be valid"),
    body('location').notEmpty().withMessage("location is required"),
    body('lastName').notEmpty().withMessage("lastName is required")
    
])
