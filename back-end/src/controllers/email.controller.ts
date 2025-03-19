import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { User } from '../models/user.model';
import { NotFoundError } from '../errors/customErrors';
import { statusCodes } from '../constants';
import { ApiResponse } from '../utils/ApiResponse';
import { logger } from '../utils/logger';

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const user = await User.findOne({
    emailVerifyToken: token,
    emailVerifyTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw new NotFoundError('Token is expired or Invalid');
  }
  user.isEmailVerified = true;
  user.emailVerifyToken = null;
  await user.save();
  logger.info(`User with ${user._id} has verified email`);
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(statusCodes.OK, {}, 'Your email is verified successfully')
    );
});
