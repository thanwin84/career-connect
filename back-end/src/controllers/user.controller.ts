import asyncHandler from "../utils/asyncHandler";
import { statusCodes } from "../utils/constants";
import { User } from "../models/user.model";
import { Job } from "../models/job.model";
import { deleteAsset, uploadOnCloudinary } from "../utils/cloudinary";
import { BadRequestError, NotFoundError } from "../errors/customErrors";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { Pagination } from "../types";

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const user = await User.findById(userId).select("-password");
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        user,
        "user is information is fetched successfully"
      )
    );
});

const getApplicationStats = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();

    res
      .status(statusCodes.OK)
      .json(
        new ApiResponse(
          statusCodes.OK,
          { users, jobs },
          "application status is fetched successfully"
        )
      );
  }
);

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.body.userFromDb;
  const updatedUser = { ...req.body };
  delete updatedUser.password;
  const oldAvatarPublicId = user?.avatar?.publicId;

  const localFilePath = req?.file?.path;
  if (localFilePath) {
    const updatedAvatarPath = await uploadOnCloudinary(localFilePath);
    if (oldAvatarPublicId) {
      await deleteAsset(oldAvatarPublicId);
    }
    if (updatedAvatarPath) {
      updatedUser.avatar.publicId = updatedAvatarPath.url;
      updatedUser.avatar.url = updatedAvatarPath.public_id;
    }
  }

  await User.findByIdAndUpdate(req.user.userId, updatedUser);
  res
    .status(statusCodes.OK)
    .json(new ApiResponse(statusCodes.OK, {}, "updated successfully"));
});

const uploadPhoto = asyncHandler(async (req: Request, res: Response) => {
  const localFilePath = req?.file?.path;
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new NotFoundError(`User with id ${req.user.userId} is not found`);
  }
  if (localFilePath) {
    const uploadedPhoto = await uploadOnCloudinary(localFilePath);
    const oldPhotoPublicId = user.avatar?.publicId;
    if (uploadedPhoto) {
      user.avatar = {
        publicId: uploadedPhoto.public_id,
        url: uploadedPhoto.url,
      };
    }
    if (oldPhotoPublicId) {
      await deleteAsset(oldPhotoPublicId);
    }
  }
  await user.save();
  res
    .status(statusCodes.OK)
    .json(new ApiResponse(statusCodes.OK, {}, "photo is updated successfully"));
});

const addEducation = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { educationRecords: req.body } },
    { $new: true }
  );

  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        updatedUser,
        "education entry is added successfully"
      )
    );
});

const deleteEducationEntry = asyncHandler(
  async (req: Request, res: Response) => {
    const { recordId } = req.params;
    if (!recordId) {
      throw new BadRequestError("record id is missing");
    }

    const records = await User.findOne(
      { _id: req.user.userId, "educationRecords._id": recordId },
      { "educationRecords.$": 1 }
    );
    if (!records) {
      throw new NotFoundError("Record does not exists");
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
      $pull: { educationRecords: { _id: recordId } },
    });

    if (!updatedUser) {
      throw new BadRequestError("User not found");
    }
    res
      .status(statusCodes.OK)
      .json(new ApiResponse(statusCodes.OK, {}, "deleted successfully"));
  }
);

const updateEducationEntry = asyncHandler(
  async (req: Request, res: Response) => {
    const { recordId } = req.params;
    if (!recordId) {
      throw new BadRequestError("record id is missing");
    }
    req.body._id = recordId;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.userId, "educationRecords._id": recordId },
      {
        "educationRecords.$": req.body,
      }
    );
    if (!updatedUser) {
      throw new BadRequestError("Record is not found");
    }
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
    throw new BadRequestError("User id is missing");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} is not found`);
  }
  user.accessStatus = !user.accessStatus;
  await user.save();
  res
    .status(statusCodes.OK)
    .json(new ApiResponse(statusCodes.OK, {}, "Access status is updated"));
});

const getUsersList = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const users = await User.aggregate([
    {
      $sort: { name: 1 },
    },
    {
      $skip: skip,
    },
    { $limit: Number(limit) },
  ]);
  const usersCount = await User.countDocuments();
  const totalPages = Math.ceil(usersCount / Number(limit));
  const pagination: Pagination = {
    totalPages,
    currentPage: Number(page),
    totalItems: usersCount,
  };

  res.status(statusCodes.OK).json({
    users,
    pagination,
  });
});

const addPhoneNumber = asyncHandler(async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    throw new BadRequestError("Phone number is missing");
  }
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new NotFoundError(`User with id ${req.user.userId} is not found`);
  }
  user.phoneNumber = phoneNumber;
  await user.save();
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(statusCodes.OK, {}, "Phone number is added successfully")
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
};
