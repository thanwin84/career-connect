import mongoose from 'mongoose';
import {
  ExperianceLevel,
  JobStatus,
  JobType,
  Pagination,
  Sort,
  UserRole,
} from '../types';
import { Job } from '../models/job.model';
import { NotFoundError } from '../errors/customErrors';
import { redisClient } from '../config/redis';
import { jobSchema } from '../schemas/jobSchema';
import { validId } from '../utils';
import { sortOptions } from '../config/appConfig';
import { jobAggregationPipeline } from '../db/aggregationPipelines';
import { Company } from '../models/company.model';

export const getSingleJobService = async (jobId: string) => {
  validId('jobId').parse(jobId);
  const cachedJob = await redisClient.get(`jobs:${jobId}`);
  let job;
  if (cachedJob) {
    job = JSON.parse(cachedJob);
    return job;
  } else {
    job = await Job.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(jobId),
        },
      },
      ...jobAggregationPipeline,
    ]);

    if (job) {
      await redisClient.set(`jobs:${jobId}`, JSON.stringify(job[0]), {
        EX: 60 * 60,
      });
    } else {
      throw new NotFoundError(`Job with id ${jobId} is not found`);
    }
  }

  return job[0];
};

type GetAllJobsCreatedByUser = {
  page: number;
  limit: number;
  search?: string;
  jobStatus?: JobStatus;
  jobType?: JobType;
  sort: Sort;
  currentUserRole: UserRole;
  userId: string;
};
export const getAllJobsCreatedByUserService = async ({
  page,
  limit,
  search,
  jobStatus,
  jobType,
  sort,
  currentUserRole,
  userId,
}: GetAllJobsCreatedByUser) => {
  const skips = (page - 1) * limit;
  const queryObject: any =
    currentUserRole === 'admin'
      ? {}
      : { createdBy: new mongoose.Types.ObjectId(userId) };
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  const sortKey =
    sortOptions[sort as keyof typeof sortOptions] || sortOptions['newest'];

  const aggregationPipeline: any = [
    {
      $match: queryObject,
    },
    {
      $sort: sortKey,
    },
    {
      $skip: skips,
    },
    {
      $limit: limit,
    },
    ...jobAggregationPipeline,
  ];
  const jobs = await Job.aggregate(aggregationPipeline);
  const totalJobs = await Job.countDocuments(queryObject);
  const totalPages = Math.ceil(totalJobs / Number(limit));

  const pagination: Pagination = {
    totalPages,
    currentPage: page,
    totalItems: totalJobs,
  };
  return { jobs, pagination };
};

type GetJobs = {
  page: number;
  limit: number;
  jobType?: JobType;
  sort?: Sort;
  minSalary?: number;
  maxSalary?: number;
  location?: string;
  search?: string;
  experianceLevel?: ExperianceLevel;
};
export const GetJobsService = async ({
  page,
  limit,
  jobType,
  sort,
  minSalary,
  maxSalary,
  location,
  search,
  experianceLevel,
}: GetJobs) => {
  const skips = (page - 1) * limit;
  const queryObject: any = {};

  const addConditions = [];

  if (location) {
    addConditions.push({
      $or: [
        { 'jobLocation.city': { $regex: location, $options: 'i' } },
        { 'jobLocation.country': { $regex: location, $options: 'i' } },
      ],
    });
  }
  if (search) {
    addConditions.push({
      $or: [
        { position: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ],
    });
  }
  if (addConditions.length > 0) {
    queryObject.$and = addConditions;
  }

  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    'a-z': { position: 1 },
    'z-a': { position: -1 },
  };
  const sortKey =
    sortOptions[sort as keyof typeof sortOptions] || sortOptions['newest'];
  if (minSalary || maxSalary) {
    (queryObject['salary.min'] = minSalary
      ? { $gte: Number(minSalary) }
      : { $gte: 0 }),
      (queryObject['salary.max'] = maxSalary
        ? { $lte: Number(maxSalary) }
        : { $lte: Number.MAX_SAFE_INTEGER });
  }
  if (jobType && Array.isArray(jobType)) {
    queryObject.jobType = { $in: jobType };
  }
  if (experianceLevel && Array.isArray(experianceLevel)) {
    queryObject.experianceLevel = { $in: experianceLevel };
  }

  const aggregationPipeline: any = [
    {
      $match: queryObject,
    },
    {
      $sort: sortKey,
    },
    {
      $skip: skips,
    },
    { $limit: Number(limit) },
    ...jobAggregationPipeline,
  ];
  const jobs = await Job.aggregate(aggregationPipeline);
  const jobsCount = await Job.countDocuments(queryObject);
  const totalPages = Math.ceil(jobsCount / limit);

  const pagination: Pagination = {
    totalPages: totalPages,
    currentPage: page,
    totalItems: jobsCount,
  };
  return {
    jobs,
    pagination,
  };
};

export const createJobService = async (data: any, userId: string) => {
  console.log(data);
  jobSchema.omit({ companyId: true, createdBy: true }).parse(data);

  const company = await Company.findOne({ adminID: userId });
  const job = await Job.create({
    ...data,
    createdBy: userId,
    companyId: company?._id,
  });
  return job;
};
export const updateJobService = async (updatedJob: any, jobId: string) => {
  validId('jobId').parse(jobId);
  jobSchema.omit({ createdBy: true }).parse(updatedJob);
  const job = await Job.findByIdAndUpdate(
    jobId,
    { $set: updatedJob },
    { new: true }
  );
  if (job) {
    await redisClient.set(`jobs:${job._id}`, JSON.stringify(job));
  } else {
    throw new NotFoundError(`Job with id ${jobId}`);
  }
  return job;
};

export const deleteJobService = async (jobId: string) => {
  validId('jobId').parse(jobId);
  const job = await Job.findOneAndDelete({ _id: jobId });
  if (!job) {
    throw new NotFoundError('Job is not found');
  }
  return job;
};
