import mongoose, { InferSchemaType } from "mongoose";
import { JOB_STATUS } from "../utils/constants";

const jobApplicationSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    recruiterId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.APPLIED,
        validate: {
            validator: function (this: any, status: string){
                if (status === JOB_STATUS.INTERVIEW && !this.interviewDate){
                    return false
                }
                return true
            },
            message: "You must provide interview data when status is set to interview"
        }
    },
    statusHistory: [
        {
            status: {
                type: String,
                enum: Object.values(JOB_STATUS),
                default: JOB_STATUS.APPLIED,
                required: true
            },
            updatedBy: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            },
            updatedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    interviewDate: {
        type: Date,
        validate: {
            validator: function (value:Date){
                return !value || value >= new Date()
            },
            message: "Interview date must be in the future"
        }
    },
    notes: {
        type: String,
        trim: true,
        maxLength: 500
    }

}, {timestamps: true})

jobApplicationSchema.pre("save", async function(next){
    if (this.isModified('status')){
        if (this.status === JOB_STATUS.INTERVIEW && !this.interviewDate){
            next(new Error("Interview date is required when status is set to interview"))
        }
    }
    return next()
})

export type JobApplicationT = InferSchemaType<typeof jobApplicationSchema>
export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema)

