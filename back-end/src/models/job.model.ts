import mongoose from "mongoose";
import {JOB_STATUS, JOB_TYPE, experianceLevel} from '../utils/constants'
const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
            trim: true
        },
        jobStatus: {
            type: String,
            enum: Object.values(JOB_STATUS),
            default: JOB_STATUS.PENDING
        },
        jobType: {
            type: String,
            enum: Object.values(JOB_TYPE),
            default: JOB_TYPE.FULL_TIME
        },
        jobLocation: {
            type: String,
            default: 'my city'
        },
        country: {
            type: String
        },
        salary: {
            type: {
                min: Number,
                max: Number
            },
            default: {min: 0, max: 0}
        },
        experianceLevel: {
            type: String,
            enum: Object.values(experianceLevel),
            default: experianceLevel.ENTRY
        },
        openRoles: Number,
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true}
)

export const Job = mongoose.model("Job", jobSchema)