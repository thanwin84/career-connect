import mongoose from 'mongoose';
import { redisClient } from '../config/redis';
import { BadRequestError, NotFoundError } from '../errors/customErrors';
import { Job } from '../models/job.model';
import { User } from '../models/user.model';
import { educationSchema, userSchema } from '../schemas/userSchema';
import { Pagination } from '../types';
import { SortOrder } from '../types/shared';
import { validId } from '../utils';
import { deleteAsset, uploadOnCloudinary } from '../utils/cloudinary';

export const currentUser = async (userId: string) => {
  validId('userId').parse(userId);
  let user;
  const cachedUser = await redisClient.get(`users:${userId}`);
  if (cachedUser) {
    user = JSON.parse(cachedUser);
  } else {
    user = await User.findById(userId)
      .populate('role worksAt')
      .select('-password');
    if (user) {
      await redisClient.set(`users:${userId}`, JSON.stringify(user), {
        EX: 60 * 60 * 6,
      });
    }
  }

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
  userSchema
    .omit({ educationRecords: true, password: true, role: true })
    .parse(updatedUser);
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User does not exist');
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
  const _updatedUser = await User.findByIdAndUpdate(userId, updatedUser, {
    new: true,
  }).select('-password');
  await redisClient.set(`users:${userId}`, JSON.stringify(_updatedUser));
  return _updatedUser;
};

export const uploadPhotoService = async (
  localFilePath: string,
  userId: string
) => {
  const user = await User.findById(userId).select('-password');
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
  await redisClient.set(`users:${userId}`, JSON.stringify(user));
  return user;
};

export const addEducationEntryService = async (data: any, userId: string) => {
  educationSchema.parse(data);
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { educationRecords: data } },
    { new: true }
  ).select('-password');
  await redisClient.set(`users:${userId}`, JSON.stringify(updatedUser));
  return updatedUser;
};

export const deleteAddEducationEntryService = async (
  recordId: string,
  userId: string
) => {
  const records = await User.findOne(
    { _id: userId, 'educationRecords._id': recordId },
    { 'educationRecords.$': 1 }
  );
  if (!records) {
    throw new NotFoundError('Record does not exists');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { educationRecords: { _id: recordId } },
    },
    { new: true }
  ).select('-password');

  if (!updatedUser) {
    throw new BadRequestError('User not found');
  } else {
    await redisClient.set(`users:${userId}`, JSON.stringify(updatedUser));
  }
};

export const updateEducationEntryService = async (
  data: any,
  userId: string,
  recordId: string
) => {
  educationSchema.parse(data);
  validId('userId').parse(userId);
  validId('recordId').parse(recordId);

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, 'educationRecords._id': recordId },
    {
      'educationRecords.$': data,
    }
  );
  if (!updatedUser) {
    throw new BadRequestError('Record is not found');
  } else {
    await redisClient.set(
      `users:${userId}`,
      JSON.stringify({ ...updatedUser, password: null })
    );
  }
};

export const getUserListService = async (
  page: number,
  limit: number,
  sort: string = 'desc',
  _id?: string
) => {
  const skip = (page - 1) * limit;
  const sortOptions = {
    asc: { createdAt: 1 },
    desc: { createdAt: -1 },
  } as const;
  const query: any = {};
  if (_id) {
    query._id = new mongoose.Types.ObjectId(_id);
  }
  const users = await User.aggregate([
    {
      $match: query,
    },
    {
      $sort: sortOptions[sort as keyof typeof sortOptions],
    },
    {
      $skip: skip,
    },
    { $limit: limit },
    {
      $lookup: {
        from: 'companies',
        localField: 'worksAt',
        foreignField: '_id',
        as: 'company',
      },
    },
    {
      $addFields: {
        company: { $first: '$company' },
      },
    },
    {
      $project: {
        password: 0,
      },
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
  ]);
  const usersCount = await User.countDocuments(query);
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
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new NotFoundError(`User with id ${userId} is not found`);
  }
  user.phoneNumber = phoneNumber;
  await user.save();
  await redisClient.set(`users:${userId}`, JSON.stringify(user));
};

export const toggleAccessStatusService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} is not found`);
  }
  user.accessStatus = !user.accessStatus;
  await user.save();
};

export const usersNameAutocompleteSuggestionService = async (
  search: string
) => {
  const results = await User.find({
    $or: [
      { firstName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ],
  })
    .limit(10) // Limit the number of results
    .select('firstName lastName _id');

  return results;
};

export const getUserByIdService = async (userId: string) => {
  validId('userId').parse(userId);
  const users = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'companies',
        localField: 'worksAt',
        foreignField: '_id',
        as: 'company',
      },
    },
    {
      $addFields: {
        company: { $first: '$company' },
      },
    },
    {
      $project: {
        password: 0,
      },
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
  ]);
  if (!users) {
    throw new NotFoundError(`User with id ${userId} is not found`);
  }
  return users[0];
};
