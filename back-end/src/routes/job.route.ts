import { Router } from "express";
import {
    getAllJobsCreatedByUser,
    createJob,
    getJob,
    updateJob,
    deleteJob,
    showStats,
    getJobs
} from "../controllers/job.controller"
import { 
    ValidateJobInput,
    validateIdParam
} from "../middleware/validationMiddleware";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router()

router.route('/all-jobs').get(getJobs)

router.route("/")
.get(authenticateUser, getAllJobsCreatedByUser)
.post(authenticateUser,ValidateJobInput,createJob)

router.route("/show-stats").get(authenticateUser, showStats)

router.route("/:id")
.get(getJob)
.patch(authenticateUser,validateIdParam,ValidateJobInput,updateJob)
.delete(authenticateUser,validateIdParam,deleteJob)

export default router