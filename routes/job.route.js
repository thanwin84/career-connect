import { Router } from "express";
import {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
    showStats
} from "../controllers/job.controller.js"
import { 
    ValidateJobInput,
    validateIdParam
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = Router()

router.use(authenticateUser)

router.route("/")
.get(getAllJobs)
.post(ValidateJobInput,createJob)

router.route("/show-stats").get(showStats)

router.route("/:id")
.get(validateIdParam,getJob)
.patch(validateIdParam,ValidateJobInput,updateJob)
.delete(validateIdParam,deleteJob)

export default router