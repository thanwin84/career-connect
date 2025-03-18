import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware';
import upload from '../middleware/multer.middleware';

const authRouter = Router();

authRouter.post(
  '/register',
  upload.single('avatar'),
  validateRegisterInput,
  register
);

authRouter.post('/login', validateLoginInput, login);

authRouter.route('/logout').get(logout);

export default authRouter;
