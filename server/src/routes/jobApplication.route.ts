import { Router } from 'express';

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
import { authenticateUser } from '../middleware/auth.middleware';

const jobApplicationRouter = Router();

jobApplicationRouter
  .route('/')
  .post(authenticateUser, apply)
  .get(authenticateUser, getAllJobApplications);

jobApplicationRouter.route('/applied').get(authenticateUser, getAppliedIdList);

jobApplicationRouter
  .route('/job-application-stats')
  .get(authenticateUser, getJobApplicationStats);
jobApplicationRouter
  .route('/my-applications')
  .get(authenticateUser, getMyApplications);
jobApplicationRouter
  .route('/update-status')
  .patch(authenticateUser, updateManyApplicationStatus);
jobApplicationRouter
  .route('/:applicationId')
  .patch(authenticateUser, updateApplicationStatus)
  .get(authenticateUser, getJobApplication)
  .delete(authenticateUser, deleteJobApplication);

export default jobApplicationRouter;
