import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware';
import upload from '../middleware/multer.middleware';

const router = Router();

router.post(
  '/register',
  upload.single('avatar'),
  validateRegisterInput,
  register
);

router.post('/login', validateLoginInput, login);

router.route('/logout').get(logout);

export default router;
