import {
  changePassword,
  deleteAccount,
  reEnterPassword,
  toggleTwoStepAuthentication,
} from '../controllers/accountSetting.controller';
import { authenticateUser } from '../middleware/auth.middleware';
import { validateChangePasswordInput } from '../middleware/validationMiddleware';
import { Router } from 'express';

const AccountRouter = Router();

AccountRouter.route('/change-password').patch(authenticateUser, changePassword);
AccountRouter.route('/re-enter-password').post(
  authenticateUser,
  reEnterPassword
);
AccountRouter.route('/toggle-two-step-authentication').patch(
  authenticateUser,
  toggleTwoStepAuthentication
);
AccountRouter.route('/delete-account').delete(authenticateUser, deleteAccount);

export default AccountRouter;
