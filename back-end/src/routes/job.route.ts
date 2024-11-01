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
router.use(authenticateUser)

router.route("/")
.get(getAllJobsCreatedByUser)
.post(ValidateJobInput,createJob)

router.route("/show-stats").get(showStats)

router.route("/:id")
.get(getJob)
.patch(validateIdParam,ValidateJobInput,updateJob)
.delete(validateIdParam,deleteJob)

export default router