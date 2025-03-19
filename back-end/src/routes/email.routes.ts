import { Router } from 'express';
import { verifyEmail } from '../controllers/email.controller';

const emailRouter = Router();

emailRouter.route('/verify-email').patch(verifyEmail);

export default emailRouter;
