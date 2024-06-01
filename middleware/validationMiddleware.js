import {
    body,
    param,
    validationResult
} from 'express-validator'
import {BadRequestError} from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'

const withValidationError = (validateValues)=>{
    return [
        validateValues,
        (req, res, next)=>{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                const errorMessages = errors.array().map(error=> error.msg)
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
    .withMessage("invalid mongoose id")
])