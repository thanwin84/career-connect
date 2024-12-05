import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { JobApplication } from "../models/jobApplication.model";
import { BadRequestError } from "../errors/customErrors";
import { statusCodes } from "../utils/constants";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse";
import {
  createJobApplicationService,
  deleteJobApplicationService,
  getMyApplicationsService,
  jobApplicationStatsService,
  updateJobApplicationStatusService,
  updateManyJobApplicationStatusService,
} from "../service/jobApplication.service";
import { JobStatus } from "../types";

const apply = asyncHandler(async (req: Request, res: Response) => {
  const { _id, candidateId } = req.body;
  const newApplication = await createJobApplicationService({
    applicationId: _id as string,
    candidateId: candidateId as string,
    userId: req.user.userId as string,
    data: req.body,
  });
  res
    .status(statusCodes.CREATED)
    .json(
      new ApiResponse(
        statusCodes.CREATED,
        { jobApplication: newApplication },
        "Job application is created successfully"
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

    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          {},
          "Application status is updated successfully"
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
    } = req.query;
    const skips = (Number(page) - 1) * Number(limit);
    const queryObject: any = {};
    const sortOptions = {
      latest: { createdAt: -1 },
      old: { createdAt: 1 },
    } as const;
    if (status && status !== "all") queryObject.status = status;
    if (candidateId)
      queryObject.candidateId = new mongoose.Types.ObjectId(
        candidateId as string
      );
    if (recruiterId)
      queryObject.recruiterId = new mongoose.Types.ObjectId(
        recruiterId as string
      );

    const jobApplications = await JobApplication.aggregate([
      {
        $match: queryObject,
      },
      {
        $sort:
          sortOptions[sort as keyof typeof sortOptions] ||
          sortOptions["latest"],
      },
      {
        $skip: skips,
      },
      {
        $limit: Number(limit),
      },
    ]);
    const total = await JobApplication.countDocuments(queryObject);
    const pages = Math.ceil(total / Number(limit));
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          { jobApplications, pages, total },
          "All jobs are fetched successfully"
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
        "All your applications are fetched successfully"
      )
    );
});
const getJobApplication = asyncHandler(async (req: Request, res: Response) => {
  const { applicationId } = req.params;
  const jobApplication = await JobApplication.findById(applicationId);
  if (!jobApplication) {
    throw new BadRequestError(
      `Job application with id ${applicationId} is not found`
    );
  }
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        { jobApplication },
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
          "Application is deleted successfully"
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
          "Job application stats have been fetched successfully"
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
