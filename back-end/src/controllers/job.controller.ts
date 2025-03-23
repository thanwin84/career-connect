import asyncHandler from '../utils/asyncHandler';
import { statusCodes } from '../constants';
import { BadRequestError } from '../errors/customErrors';
import { Request, Response } from 'express';
import { ExperianceLevel, JobStatus, JobType, Sort, UserRole } from '../types';
import {
  createJobService,
  deleteJobService,
  getAllJobsCreatedByUserService,
  GetJobsService,
  getSingleJobService,
  updateJobService,
} from '../service/job.service';
import { ApiResponse } from '../utils/ApiResponse';
import { jobSchema } from '../schemas/jobSchema';

const getAllJobsCreatedByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      limit = 10,
      page = 1,
      search,
      jobStatus,
      jobType,
      sort,
    } = req.query;

    const response = await getAllJobsCreatedByUserService({
      limit: Number(limit),
      page: Number(page),
      search: search as string,
      jobStatus: jobStatus as JobStatus,
      jobType: jobType as JobType,
      sort: sort as Sort,
      userId: req.user.userId,
      currentUserRole: req.user.role as UserRole,
    });

    res
      .status(statusCodes.OK)
      .json(new ApiResponse(statusCodes.OK, response, 'successfully fetched'));
  }
);

const getJobs = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    jobType,
    sort,
    location,
    search,
    minSalary,
    maxSalary,
    experianceLevel,
  } = req.query;

  const response = await GetJobsService({
    page: Number(page),
    limit: Number(limit),
    jobType: jobType as JobType,
    location: location as string,
    search: search as string,
    minSalary: Number(minSalary),
    maxSalary: Number(maxSalary),
    experianceLevel: experianceLevel as ExperianceLevel,
    sort: sort as Sort,
  });
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        response,
        'Jobs have been fetched successfully'
      )
    );
});

const createJob = asyncHandler(async (req: Request, res: Response) => {
  req.body.createdBy = req.user.userId;
  jobSchema.parse(req.body);
  const job = await createJobService(req.body);

  res.status(statusCodes.CREATED).json({ job });
});

const getJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await getSingleJobService(id);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(statusCodes.OK, { job }, 'Job is fetched successfully')
    );
});

const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await updateJobService(req.body, id);

  res.status(statusCodes.OK).json({ mgs: `Job modified:`, job });
});

const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError('Id is missing');
  }
  await deleteJobService(id);

  res.status(statusCodes.OK).json({ msg: 'job deleted' });
});

export {
  getAllJobsCreatedByUser,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getJobs,
};
