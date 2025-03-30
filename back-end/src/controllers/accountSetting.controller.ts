import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { statusCodes } from '../constants';
import {
  changePasswordService,
  deleteAccountService,
  reEnterPasswordService,
  toggleTwoStepAuthenticationService,
} from '../service/account.service';

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId;

  await changePasswordService({ oldPassword, newPassword, userId });
  res
    .status(statusCodes.OK)
    .json({ message: 'Your password has been changed successfully' });
});

const reEnterPassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { password } = req.body;
  await reEnterPasswordService(password, userId);
  res.status(statusCodes.OK).json({ message: 'your password is correct' });
});

const toggleTwoStepAuthentication = asyncHandler(
  async (req: Request, res: Response) => {
    await toggleTwoStepAuthenticationService(req.user.userId);
    res
      .status(statusCodes.OK)
      .json({ message: 'two step authentican is updated.' });
  }
);

const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  await deleteAccountService(userId);
  res.status(200).json({ message: 'Your account has been deleted' });
});

export {
  changePassword,
  reEnterPassword,
  deleteAccount,
  toggleTwoStepAuthentication,
};
