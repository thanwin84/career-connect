import { Router } from 'express';
import {
  validateApplicationUpdateStatus,
  validateJobApplicationInput,
} from '../middleware/validationMiddleware';
import {
  apply,
  deleteJobApplication,
  getAllJobApplications,
  getAppliedIdList,
  getJobApplication,
  getJobApplicationStats,
  getMyApplications,
  updateApplicationStatus,
  updateManyApplicationStatus,
} from '../controllers/jobApplication.controller';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/auth.middleware';

const jobApplicationRouter = Router();

jobApplicationRouter
  .route('/')
  .post(authenticateUser, validateJobApplicationInput, apply)
  .get(authenticateUser, authorizePermissions('admin'), getAllJobApplications);

jobApplicationRouter.route('/applied').get(authenticateUser, getAppliedIdList);

jobApplicationRouter
  .route('/job-application-stats')
  .get(authenticateUser, getJobApplicationStats);
jobApplicationRouter
  .route('/my-applications')
  .get(authenticateUser, getMyApplications);
jobApplicationRouter
  .route('/update-status')
  .patch(
    authenticateUser,
    validateApplicationUpdateStatus,
    updateManyApplicationStatus
  );
jobApplicationRouter
  .route('/:applicationId')
  .patch(authenticateUser, updateApplicationStatus)
  .get(authenticateUser, getJobApplication)
  .delete(authenticateUser, deleteJobApplication);

export default jobApplicationRouter;
