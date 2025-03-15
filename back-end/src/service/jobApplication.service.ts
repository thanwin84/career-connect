import mongoose from 'mongoose';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors';
import { JobApplication } from '../models/jobApplication.model';
import { JobStatus, Pagination } from '../types';
import { JOB_STATUS } from '../constants';
import { formatMonth } from '../utils/format';
import { Job } from '../models/job.model';

export const jobApplicationStatsService = async (userId: string) => {
  const stats = await JobApplication.aggregate([
    {
      $match: {
        candidateId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: '$status',
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const statsObject = stats.reduce((prev, acc) => {
    prev[acc._id] = acc.count;
    return prev;
  }, {});

  const defaultStats = {
    [JOB_STATUS.APPLIED]: statsObject?.applied || 0,
    [JOB_STATUS.SHORTLISTED]: statsObject?.shortListed || 0,
    [JOB_STATUS.INTERVIEW]: statsObject?.interview || 0,
    [JOB_STATUS.DECLINED]: statsObject?.declined || 0,
    [JOB_STATUS.HIRED]: statsObject?.hired || 0,
  };
  let monthlyApplications = await JobApplication.aggregate([
    {
      $match: {
        candidateId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $addFields: {
        createdAt: { $toDate: '$createdAt' },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { year: -1, month: -1 },
    },
    {
      $limit: 12,
    },
  ]);
  monthlyApplications = monthlyApplications.map((item) => ({
    date: `${formatMonth(item._id.month - 1)} ${item._id.year}`,
    count: item.count,
  }));
  return { defaultStats, monthlyApplications };
};

type CreateJobApplicationService = {
  applicationId: string;
  userId: string;
  candidateId: string;
  data: any;
};

export const createJobApplicationService = async ({
  applicationId,
  userId,
  candidateId,
  data,
}: CreateJobApplicationService) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const existingApplication = await JobApplication.findById(
      applicationId
    ).session(session);
    if (existingApplication) {
      throw new BadRequestError(
        `Application with id ${applicationId} already exists`
      );
    }
    if (candidateId !== userId) {
      throw new ForbiddenError('You are not allowed to do this operation');
    }
    const newApplication = await JobApplication.create([data], { session });
    const job = await Job.findById(data.jobId).session(session);
    if (!job) {
      throw new NotFoundError(`Job with id ${data.jobId} not found`);
    }
    job.numberOfApplicants = job.numberOfApplicants + 1;
    await job.save({ session });
    await session.commitTransaction();
    session.endSession();
    return newApplication;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

type UpdateJobApplicationStatus = {
  applicationId: string;
  userId: string;
  status: JobStatus;
};

export const updateJobApplicationStatusService = async ({
  applicationId,
  userId,
  status,
}: UpdateJobApplicationStatus) => {
  const application = await JobApplication.findById(applicationId);
  if (!application) {
    throw new NotFoundError(
      `Application with id ${applicationId} does not exists`
    );
  }
  // only recruiter can modify the application
  if (application.recruiterId.toString() !== userId) {
    throw new ForbiddenError(
      'You are not allowed to modify the application status'
    );
  }
  application.status = status;
  application.statusHistory.push({
    status: status,
    updatedBy: userId,
    updatedAt: new Date(),
  });
  await application.save();
};

export const updateManyJobApplicationStatusService = async (
  status: JobStatus,
  applicationIds: string[],
  userId: string
) => {
  const queryObject: any = {};
  if (applicationIds && Array.isArray(applicationIds)) {
    queryObject._id = { $in: applicationIds };
  }
  const { modifiedCount } = await JobApplication.updateMany(
    queryObject,
    {
      $set: { status: status },
      $push: {
        statusHistory: {
          status: status,
          updatedBy: userId,
        },
      },
    },
    { runValidators: true }
  );
  return { modifiedCount };
};

type GetMyApplication = {
  page: number;
  limit: number;
  userId: string;
  status: JobStatus;
  sort: string;
};
export const getMyApplicationsService = async ({
  page,
  limit,
  userId,
  status,
  sort,
}: GetMyApplication) => {
  const skips = (page - 1) * limit;
  const queryObject: any = {
    candidateId: new mongoose.Types.ObjectId(userId),
  };
  if (status && status !== 'all') queryObject.status = status;
  const sortOptions = {
    latest: { createdAt: -1 },
    old: { createdAt: 1 },
  } as const;
  const jobApplications = await JobApplication.aggregate([
    {
      $match: queryObject,
    },
    {
      $sort:
        sortOptions[sort as keyof typeof sortOptions] || sortOptions['latest'],
    },
    {
      $skip: skips,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'jobs',
        localField: 'jobId',
        foreignField: '_id',
        as: 'job',
      },
    },
    {
      $addFields: {
        job: { $arrayElemAt: ['$job', 0] },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'recruiterId',
        foreignField: '_id',
        as: 'recruiter',
      },
    },
    {
      $addFields: {
        recruiter: { $arrayElemAt: ['$recruiter', 0] },
      },
    },
    {
      $unset: ['recruiterId', 'candidateId', 'jobId'],
    },
  ]);

  const total = await JobApplication.countDocuments(queryObject);
  const pages = Math.ceil(total / Number(limit));
  const pagination: Pagination = {
    totalPages: pages,
    totalItems: total,
    currentPage: page,
  };
  return {
    jobApplications,
    pagination,
  };
};

export const deleteJobApplicationService = async (
  applicationId: string,
  userId: string,
  userRole: string
) => {
  const jobApplication = await JobApplication.findById(applicationId);
  if (!jobApplication) {
    throw new NotFoundError(
      `Job application with id ${applicationId} is not found`
    );
  }
  if (userRole === 'admin' || jobApplication.recruiterId === userId) {
    await JobApplication.deleteOne({ _id: applicationId });
  } else {
    throw new UnauthorizedError('you are not allowed to perform to delete');
  }
};

export const getAppliedJobIdsService = async (userId: string) => {
  const result = await JobApplication.find({ candidateId: userId });
  const ids = result?.map((item) => item.jobId);
  return ids;
};
