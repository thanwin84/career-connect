import { Router } from 'express';
import {
  getAllJobsCreatedByUser,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getJobs,
} from '../controllers/job.controller';
import {
  ValidateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware';
import { authenticateUser } from '../middleware/auth.middleware';

const jobRouter = Router();

jobRouter.route('/all-jobs').get(getJobs);

jobRouter
  .route('/')
  .get(authenticateUser, getAllJobsCreatedByUser)
  .post(authenticateUser, ValidateJobInput, createJob);

jobRouter
  .route('/:id')
  .get(getJob)
  .patch(authenticateUser, validateIdParam, ValidateJobInput, updateJob)
  .delete(authenticateUser, validateIdParam, deleteJob);

export default jobRouter;
