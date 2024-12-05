import { Router } from "express";
import {
  validateApplicationUpdateStatus,
  validateJobApplicationInput,
} from "../middleware/validationMiddleware";
import {
  apply,
  deleteJobApplication,
  getAllJobApplications,
  getJobApplication,
  getJobApplicationStats,
  getMyApplications,
  updateApplicationStatus,
  updateManyApplicationStatus,
} from "../controllers/jobApplication.controller";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .post(authenticateUser, validateJobApplicationInput, apply)
  .get(authenticateUser, authorizePermissions("admin"), getAllJobApplications);

router
  .route("/job-application-stats")
  .get(authenticateUser, getJobApplicationStats);
router.route("/my-applications").get(authenticateUser, getMyApplications);
router
  .route("/update-status")
  .patch(
    authenticateUser,
    validateApplicationUpdateStatus,
    updateManyApplicationStatus
  );
router
  .route("/:applicationId")
  .patch(authenticateUser, updateApplicationStatus)
  .get(authenticateUser, getJobApplication)
  .delete(authenticateUser, deleteJobApplication);

export default router;
