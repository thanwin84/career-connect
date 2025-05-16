import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors';
import { UserDocument, User } from '../models/user.model';
import { changePasswordSchema, userSchema } from '../schemas/userSchema';
import { scheduleDeleteAccountJob } from '../tasks/account-deletion/deleteAccountQueue';
import { validId } from '../utils';
import { logger } from '../utils/logger';

export const changePasswordService = async ({
  userId,
  oldPassword,
  newPassword,
}: {
  userId: string;
  oldPassword: string;
  newPassword: string;
}) => {
  changePasswordSchema.parse({ oldPassword, newPassword });
  const user: UserDocument | null = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new BadRequestError('Your current password is incorrect');
  }
  user.password = newPassword;
  await user.save();
};

export const reEnterPasswordService = async (
  password: string,
  userId: string
) => {
  validId('userId').parse(userId);
  userSchema.pick({ password: true }).parse({ password });
  const user: UserDocument | null = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('invalid credentials');
  }
};

export const toggleTwoStepAuthenticationService = async (userId: string) => {
  console.log('doing');
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`user with id ${userId} not found`);
  }
  if (!user.phoneNumber) {
    throw new BadRequestError(
      'Please provide your phone number to enable this'
    );
  }
  user.twoStepAuthentication = !user.twoStepAuthentication;
  await user.save();
};
export const deleteAccountService = async (userId: string) => {
  // delete the account
  const user = await User.findByIdAndUpdate(userId, {
    $set: { isDeleted: new Date() },
  });

  if (!user) {
    throw new NotFoundError(`User with id ${userId} could not be found`);
  }
  scheduleDeleteAccountJob(userId);
  logger.info(`user with ${user.email} has deleted account`);
};
