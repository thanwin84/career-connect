import { Router } from "express";
import {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
} from "../controllers/job.controller.js"
import { 
    ValidateJobInput,
    validateIdParam

} from "../middleware/validationMiddleware.js";

const router = Router()

router.route("/")
.get(getAllJobs)
.post(ValidateJobInput,createJob)

router.route("/:id")
.get(validateIdParam,getJob)
.patch(validateIdParam,ValidateJobInput,updateJob)
.delete(validateIdParam,deleteJob)

export default router