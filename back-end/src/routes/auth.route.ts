import { Router } from 'express';
import {
  register,
  login,
  logout,
  checkEmail,
} from '../controllers/auth.controller';

import upload from '../middleware/multer.middleware';

const authRouter = Router();

authRouter.post('/register', upload.single('avatar'), register);

authRouter.post('/login', login);

authRouter.route('/logout').get(logout);
authRouter.route('/check-email').post(checkEmail);

export default authRouter;
