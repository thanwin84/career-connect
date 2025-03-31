import mongoose from 'mongoose';
import { JOB_TYPE, experianceLevel } from '../constants';
import { locationSchema } from './location.model';
const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: locationSchema,
    salary: {
      type: {
        min: Number,
        max: Number,
      },
      default: { min: 0, max: 0 },
    },
    experianceLevel: {
      type: String,
      enum: Object.values(experianceLevel),
      default: experianceLevel.ENTRY,
    },
    openRoles: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    numberOfApplicants: {
      type: Number,
      default: 0,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const Job = mongoose.model('Job', jobSchema);
