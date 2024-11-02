import { Router } from "express";
import { validateJobApplicationInput } from "../middleware/validationMiddleware";
import { apply, deleteJobApplication, getAllJobApplications, getJobApplication, getMyApplications, updateApplicationStatus } from "../controllers/jobApplication.controller";
import { authenticateUser, authorizePermissions } from "../middleware/auth.middleware";

const router = Router()

router.route("/")
.post(authenticateUser,validateJobApplicationInput, apply)
.get(authenticateUser, authorizePermissions("admin"), getAllJobApplications)

router.route("/my-applications").get(authenticateUser, getMyApplications)
router.route('/:applicationId')
.patch(authenticateUser,authorizePermissions("admin"), updateApplicationStatus)
.get(authenticateUser, getJobApplication)
.delete(authenticateUser, deleteJobApplication)

export default router