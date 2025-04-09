import asyncHandler from '../utils/asyncHandler';
import { statusCodes } from '../constants';
import { BadRequestError } from '../errors/customErrors';
import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import {
  addEducationEntryService,
  addPhoneNumberService,
  currentUser,
  deleteAddEducationEntryService,
  getApplicationStatsService,
  getUserByIdService,
  getUserListService,
  toggleAccessStatusService,
  updateEducationEntryService,
  updateUserService,
  uploadPhotoService,
  usersNameAutocompleteSuggestionService,
} from '../service/user.service';
import { SortOrder } from 'mongoose';

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const user = await currentUser(userId);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        user,
        'user is information is fetched successfully'
      )
    );
});

const getApplicationStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { users, jobs } = await getApplicationStatsService();
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          { users, jobs },
          'application status is fetched successfully'
        )
      );
  }
);

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  await updateUserService(req.body, req.user.userId, req?.file);
  res
    .status(statusCodes.OK)
    .json(new ApiResponse(statusCodes.OK, {}, 'updated successfully'));
});

const uploadPhoto = asyncHandler(async (req: Request, res: Response) => {
  const localFilePath = req?.file?.path || '';
  await uploadPhotoService(localFilePath, req.user.userId);
  res
    .status(statusCodes.OK)
    .json(new ApiResponse(statusCodes.OK, {}, 'photo is updated successfully'));
});

const addEducation = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const updatedUser = await addEducationEntryService(req.body, userId);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        updatedUser,
        'education entry is added successfully'
      )
    );
});

const deleteEducationEntry = asyncHandler(
  async (req: Request, res: Response) => {
    const { recordId } = req.params;
    if (!recordId) {
      throw new BadRequestError('record id is missing');
    }
    await deleteAddEducationEntryService(recordId, req.user.userId);
    res
      .status(statusCodes.OK)
      .json(new ApiResponse(statusCodes.OK, {}, 'deleted successfully'));
  }
);

const updateEducationEntry = asyncHandler(
  async (req: Request, res: Response) => {
    const { recordId } = req.params;
    if (!recordId) {
      throw new BadRequestError('record id is missing');
    }
    req.body._id = recordId;
    await updateEducationEntryService(req.body, req.user.userId, recordId);
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          {},
          `Education entry with id ${recordId} is updated successfully`
        )
      );
  }
);

// for admin
const toggleAccessStatus = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    throw new BadRequestError('User id is missing');
  }
  await toggleAccessStatusService(userId);
  res
    .status(statusCodes.OK)
    .json(new ApiResponse(statusCodes.OK, {}, 'Access status is updated'));
});

const getUsersList = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, sort, _id } = req.query;
  const response = await getUserListService(
    Number(page),
    Number(limit),
    sort as string,
    _id as string
  );
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        response,
        'user list is fetched successfully'
      )
    );
});

const addPhoneNumber = asyncHandler(async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    throw new BadRequestError('Phone number is missing');
  }
  await addPhoneNumberService(phoneNumber, req.user.userId);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(statusCodes.OK, {}, 'Phone number is added successfully')
    );
});

const usersNameAutocompleteSuggestions = asyncHandler(
  async (req: Request, res: Response) => {
    const { search } = req.query;
    const results = await usersNameAutocompleteSuggestionService(
      search as string
    );
    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          results,
          'Users name list is fetched successfully'
        )
      );
  }
);

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await getUserByIdService(userId);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(statusCodes.OK, user, `User is fetched successfully`)
    );
});
export {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  addEducation,
  deleteEducationEntry,
  updateEducationEntry,
  toggleAccessStatus,
  getUsersList,
  addPhoneNumber,
  uploadPhoto,
  usersNameAutocompleteSuggestions,
  getUserById,
};
