import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  addEducation,
  deleteEducationEntry,
  updateEducationEntry,
  toggleAccessStatus,
  getUsersList,
  addPhoneNumber,
  uploadPhoto,
  usersNameAutocompleteSuggestions,
  getUserById,
} from '../controllers/user.controller';
import { authenticateUser } from '../middleware/auth.middleware';
import upload from '../middleware/multer.middleware';

const userRouter = Router();

userRouter.route('/profile/:userId').get(getUserById);

userRouter.use(authenticateUser);
userRouter.route('/search').get(usersNameAutocompleteSuggestions);
userRouter
  .route('/upload-profile-photo')
  .patch(upload.single('avatar'), uploadPhoto);
userRouter.route('/toggle-access-status/:userId').patch(toggleAccessStatus);
userRouter.route('/get-users-list').get(getUsersList);

userRouter.route('/current-user').get(getCurrentUser);
userRouter.route('/admin/app-stats').get(getApplicationStats);
userRouter.route('/update-user').patch(upload.single('avatar'), updateUser);
userRouter.route('/add-phone-number').patch(addPhoneNumber);
userRouter.route('/add-education').patch(addEducation);
userRouter.route('/education/:recordId').patch(deleteEducationEntry);
userRouter
  .route('/education/:recordId/update-record')
  .patch(updateEducationEntry);

export default userRouter;
