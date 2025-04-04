import mongoose from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customErrors';
import { Role } from '../models/role.model';
import { User, UserDocument } from '../models/user.model';
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
    const userRole = isFirstAccount ? 'admin' : data.role;
    const role = await Role.findOne({ role: userRole }).session(session);

    if (!role) {
      throw new NotFoundError(`role: ${userRole} is not found`);
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
    const user = await User.create(
      [
        {
          ...data,
          role: [role?.id],
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
  const user: UserDocument | null = await User.findOne({ email: email })
    .populate('role worksAt')
    .select('-password');
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
  const user = await User.findOne({ email });

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
