import { Router } from 'express';
import {
  getAllJobsCreatedByUser,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getJobs,
} from '../controllers/job.controller';
import { authenticateUser } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { permissions } from '../constants/permissions';

const jobRouter = Router();

jobRouter.route('/all-jobs').get(getJobs);

jobRouter
  .route('/')
  .get(authenticateUser, getAllJobsCreatedByUser)
  .post(authenticateUser, authorize(permissions.JOB_CREATE), createJob);

jobRouter
  .route('/:id')
  .get(getJob)
  .patch(authenticateUser, updateJob)
  .delete(authenticateUser, deleteJob);

export default jobRouter;
