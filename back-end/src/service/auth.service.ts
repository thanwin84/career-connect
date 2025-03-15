import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customErrors';
import { User, UserDocument } from '../models/user.model';
import { uploadOnCloudinary } from '../utils/cloudinary';
import { logger } from '../utils/logger';

export const registerUser = async (data: any, file?: Express.Multer.File) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  data.role = isFirstAccount ? 'admin' : 'user';
  const userExists = await User.findOne({ email: data.email });

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
  const user = await User.create(data);
  logger.info(`New user registered: ${user.email} with role ${user.role}`);
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user: UserDocument | null = await User.findOne({ email: email });
  if (!user) {
    throw new NotFoundError('user does not exist');
  }
  const isPasswordValid = user.isPasswordCorrect(password);
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
