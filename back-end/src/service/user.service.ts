import { BadRequestError, NotFoundError } from "../errors/customErrors";
import { Job } from "../models/job.model";
import { User } from "../models/user.model";
import { Pagination } from "../types";
import { deleteAsset, uploadOnCloudinary } from "../utils/cloudinary";

export const currentUser = async (userId: string) => {
  if (!userId) {
    throw new BadRequestError("User id is missing");
  }
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }
  return user;
};

export const getApplicationStatsService = async () => {
  const [users, jobs] = await Promise.all([
    User.countDocuments(),
    Job.countDocuments(),
  ]);
  return { users, jobs };
};

export const updateUserService = async (
  data: any,
  userId: string,
  file?: Express.Multer.File
) => {
  const updatedUser = { ...data };
  delete updatedUser.password;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User does not exist");
  }
  const oldAvatarPublicId = user.avatar?.publicId;
  if (file) {
    const updatedAvatarPath = await uploadOnCloudinary(file.path);
    if (oldAvatarPublicId) {
      await deleteAsset(oldAvatarPublicId);
    }
    if (updatedAvatarPath) {
      updatedUser.avatar = {
        url: updatedAvatarPath.url,
        publicId: updatedAvatarPath.public_id,
      };
    }
  }
  return await User.findByIdAndUpdate(userId, updatedUser);
};

export const uploadPhotoService = async (
  localFilePath: string,
  userId: string
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} is not found`);
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
  return user;
};

export const addEducationEntryService = async (data: any, userId: string) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { educationRecords: data } },
    { $new: true }
  );
  return updatedUser;
};

export const deleteAddEducationEntryService = async (
  recordId: string,
  userId: string
) => {
  const records = await User.findOne(
    { _id: userId, "educationRecords._id": recordId },
    { "educationRecords.$": 1 }
  );
  if (!records) {
    throw new NotFoundError("Record does not exists");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
    $pull: { educationRecords: { _id: recordId } },
  });

  if (!updatedUser) {
    throw new BadRequestError("User not found");
  }
};

export const updateEducationEntryService = async (
  data: any,
  userId: string,
  recordId: string
) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, "educationRecords._id": recordId },
    {
      "educationRecords.$": data,
    }
  );
  if (!updatedUser) {
    throw new BadRequestError("Record is not found");
  }
};

export const getUserListService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const users = await User.aggregate([
    {
      $sort: { name: 1 },
    },
    {
      $skip: skip,
    },
    { $limit: limit },
  ]);
  const usersCount = await User.countDocuments();
  const totalPages = Math.ceil(usersCount / Number(limit));
  const pagination: Pagination = {
    totalPages,
    currentPage: page,
    totalItems: usersCount,
  };
  return {
    users,
    pagination,
  };
};

export const addPhoneNumberService = async (
  phoneNumber: string,
  userId: string
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} is not found`);
  }
  user.phoneNumber = phoneNumber;
  await user.save();
};

export const toggleAccessStatusService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} is not found`);
  }
  user.accessStatus = !user.accessStatus;
  await user.save();
};