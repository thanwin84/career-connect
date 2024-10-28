import mongoose from "mongoose";
import {JOB_STATUS, JOB_TYPE, experianceLevel} from '../utils/constants.js'
const jobSchema = new mongoose.Schema(
    {
        company: String,
        position: String,
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
            }
        },
        experianceLevel: {
            type: String,
            enum: Object.values(experianceLevel),
            default: experianceLevel.ENTRY
        },
        openRoles: Number,
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
)

export const Job = mongoose.model("Job", jobSchema)