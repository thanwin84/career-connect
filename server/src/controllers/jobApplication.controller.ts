import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { JobApplication } from '../models/jobApplication.model';
import { NotFoundError } from '../errors/customErrors';
import { statusCodes } from '../constants';
import { ApiResponse } from '../utils/ApiResponse';
import {
  createJobApplicationService,
  deleteJobApplicationService,
  getAllJobApplicationsService,
  getAppliedJobIdsService,
  getJobApplicationService,
  getMyApplicationsService,
  jobApplicationStatsService,
  updateJobApplicationStatusService,
  updateManyJobApplicationStatusService,
} from '../service/jobApplication.service';
import { JobStatus } from '../types';
import { Notification } from '../models/notification.model';
import { Job_Update_Notification } from '../types/shared';
import { Job } from '../models/job.model';
import { onlineUsers, io } from '..';

const apply = asyncHandler(async (req: Request, res: Response) => {
  const { jobId, id } = req.body;

  const newApplication = await createJobApplicationService({
    userId: req.user.userId as string,
    jobId: jobId as string,
    id: id,
  });

  res
    .status(statusCodes.CREATED)
    .json(
      new ApiResponse(
        statusCodes.CREATED,
        { jobApplication: newApplication },
        'Job application is created successfully'
      )
    );
});

const updateApplicationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { applicationId } = req.params;

    await updateJobApplicationStatusService({
      applicationId: applicationId as string,
      userId: req.user.userId as string,
      status: req.body.status,
    });

    const applicantion = await JobApplication.findById(applicationId);
    if (!applicantion) {
      throw new NotFoundError(
        `Application with id ${applicationId} is not found`
      );
    }
    const job = await Job.findById(applicantion?.jobId);
    if (!job) {
      throw new NotFoundError(`Job with id ${applicantion?.jobId} not found`);
    }
    const data: Job_Update_Notification = {
      company: 'Meta', //TODO: remove it later
      position: job?.position,
      status: req.body.status,
      date: new Date().toString(),
    };
    const notification = await Notification.create({
      userId: applicantion?.candidateId,
      type: 'job_update',
      data,
    });
    const recipentSocketId = onlineUsers.get(
      applicantion.candidateId.toString()
    );

    if (recipentSocketId) {
      io.to(recipentSocketId).emit('new_notification', notification);
    }

    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          {},
          'Application status is updated successfully'
        )
      );
  }
);

const updateManyApplicationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { applicationIds } = req.query;
    const { status } = req.body;

    const applicationIdList = Array.isArray(applicationIds)
      ? applicationIds.map((item) => String(item))
      : [];

    const { modifiedCount } = await updateManyJobApplicationStatusService(
      status,
      applicationIdList,
      req.user.userId
    );
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          {},
          `${modifiedCount} applications updated successfully`
        )
      );
  }
);
const getAllJobApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      limit = 10,
      page = 1,
      status,
      candidateId,
      recruiterId,
      sort,
      candidateName,
    } = req.query;
    const data = await getAllJobApplicationsService({
      limit: Number(limit),
      page: Number(page),
      status: status as string,
      candidateId: candidateId as string,
      recruiterId: recruiterId as string,
      sort: sort as string,
      candidateName: sort as string,
    });
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          data,
          'All jobs are fetched successfully'
        )
      );
  }
);

const getMyApplications = asyncHandler(async (req: Request, res: Response) => {
  const { limit = 10, page = 1, sort, status } = req.query;
  const myApplications = await getMyApplicationsService({
    page: Number(page),
    limit: Number(limit),
    userId: req.user.userId,
    sort: sort as string,
    status: status as JobStatus,
  });
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        myApplications,
        'All your applications are fetched successfully'
      )
    );
});
const getJobApplication = asyncHandler(async (req: Request, res: Response) => {
  const { applicationId } = req.params;
  const data = await getJobApplicationService(applicationId);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        data,
        `Applicaiton with id ${applicationId} is fetched successfully`
      )
    );
});

const deleteJobApplication = asyncHandler(
  async (req: Request, res: Response) => {
    const { applicationId } = req.params;

    await deleteJobApplicationService(
      applicationId,
      req.user.userId,
      req.user.role
    );
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          {},
          'Application is deleted successfully'
        )
      );
  }
);

const getJobApplicationStats = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const { defaultStats, monthlyApplications } =
      await jobApplicationStatsService(userId);
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          { defaultStats, monthlyApplications },
          'Job application stats have been fetched successfully'
        )
      );
  }
);

export const getAppliedIdList = asyncHandler(
  async (req: Request, res: Response) => {
    const idList = await getAppliedJobIdsService(req.user.userId);
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          { ids: idList },
          'Applied id list is feched successfully'
        )
      );
  }
);

export {
  apply,
  updateApplicationStatus,
  getAllJobApplications,
  getJobApplication,
  getMyApplications,
  deleteJobApplication,
  updateManyApplicationStatus,
  getJobApplicationStats,
};
