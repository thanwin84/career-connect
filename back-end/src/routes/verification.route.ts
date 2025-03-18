import { Router } from 'express';
import { authenticateUser } from '../middleware/auth.middleware';
import {
  sendVerificationCode,
  verifyVerificationCode,
} from '../controllers/verification.controller';
import { deleteAccount } from '../controllers/accountSetting.controller';

const verificationRouter = Router();

verificationRouter
  .route('/send-verification-code')
  .post(authenticateUser, sendVerificationCode);
verificationRouter
  .route('/verify-code')
  .post(authenticateUser, verifyVerificationCode);
verificationRouter
  .route('/delete-account')
  .delete(authenticateUser, deleteAccount);

export default verificationRouter;
