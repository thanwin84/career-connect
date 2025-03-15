import { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customErrors';
import { User, UserDocument } from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import { statusCodes } from '../constants';
import { scheduleDeleteAccountJob } from '../tasks/account-deletion/deleteAccountQueue';
import { logger } from '../utils/logger';

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const user: UserDocument | null = await User.findById(req.user.userId);
  if (!user) {
    throw new NotFoundError(`User with id ${req.user.userId} not found`);
  }
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new BadRequestError('Your current password is incorrect');
  }
  user.password = newPassword;
  await user.save();
  res
    .status(statusCodes.OK)
    .json({ message: 'Your password has been changed successfully' });
});

const reEnterPassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { password } = req.body;
  if (!password) {
    throw new BadRequestError('Password feild is required');
  }
  const user: UserDocument | null = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`User with id ${req.user.userId} not found`);
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('invalid credentials');
  }
  res.status(statusCodes.OK).json({ message: 'your password is correct' });
});

const toggleTwoStepAuthentication = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new NotFoundError(`user with id ${req.user.userId} not found`);
    }
    if (!user.phoneNumber) {
      throw new BadRequestError(
        'Please provide your phone number to enable this'
      );
    }
    user.twoStepAuthentication = !user.twoStepAuthentication;
    await user.save();
    res
      .status(statusCodes.OK)
      .json({ message: 'two step authentican is updated.' });
  }
);

const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  // delete the account
  const user = await User.findByIdAndUpdate(userId, {
    $set: { isDeleted: new Date() },
  });

  if (!user) {
    throw new NotFoundError(`User with id ${userId} could not be found`);
  }
  scheduleDeleteAccountJob(userId);
  logger.info(`user with ${user.email} has deleted account`);
  res.status(200).json({ message: 'Your account has been deleted' });
});

export {
  changePassword,
  reEnterPassword,
  deleteAccount,
  toggleTwoStepAuthentication,
};
