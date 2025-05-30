/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customErrors';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { uploadOnCloudinary } from '../utils/cloudinary';
import { logger } from '../utils/logger';
import { sendEmail } from '../utils/sendEmail';
import { userSchema } from '../schemas/userSchema';

export const registerUser = async (data: any, file?: Express.Multer.File) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  userSchema.omit({ educationRecords: true }).parse(data);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    let primaryRole;

    if (data.role !== 'user') {
      const userRole = isFirstAccount ? 'admin' : data.role;
      primaryRole = await Role.findOne({ role: userRole }).session(session);
    }
    const defaultRole = await Role.findOne({ role: 'user' }).session(session);

    if (!defaultRole) {
      logger.error(`Role not found for user`);
      throw new NotFoundError(`role: ${primaryRole} is not found`);
    }

    const userExists = await User.findOne({ email: data.email }).session(
      session
    );

    if (userExists) {
      logger.warn(
        `Registration attempt failed: User with email ${data.email} already exists`
      );
      throw new BadRequestError('User is already registered');
    }

    if (file) {
      const uploadResponse = await uploadOnCloudinary(file.path);
      if (uploadResponse) {
        data.avatar = {
          publicId: uploadResponse.public_id,
          url: uploadResponse.url,
        };
      }
    }
    const roles = [defaultRole._id.toString()];
    if (primaryRole) roles.push(primaryRole._id.toString());
    const user = await User.create(
      [
        {
          ...data,
          role: roles,
        },
      ],
      { session: session }
    );

    await sendEmail({
      emailType: 'emailVerify',
      to: user[0].email,
      userId: user[0]._id.toString(),
      session: session,
    });
    logger.info(
      `New user registered: ${user[0].email} with role ${user[0].role}`
    );
    await session.commitTransaction();
    session.endSession();
    return user;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  userSchema.pick({ email: true, password: true }).parse({ email, password });
  const user: any = await User.findOne({
    email: email,
  }).populate('role worksAt');

  if (!user) {
    throw new NotFoundError('user does not exist');
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new UnauthenticatedError('invalid credentials');
  }
  if (!user.accessStatus) {
    logger.warn(`Blocked user ${user.email} attempted to login`);
    throw new UnauthenticatedError('Access Denied');
  }
  logger.info(`${user._id} has accessed the site`);
  return user;
};

export const checkEmailService = async (email: string) => {
  if (!email) {
    throw new BadRequestError('Email does not exists');
  }
  const user = await User.findOne({ email }).populate('role');

  if (user) {
    return {
      exists: true,
    };
  } else {
    return {
      exists: false,
    };
  }
};
