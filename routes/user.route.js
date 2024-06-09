import { Router } from "express";
import {
    getCurrentUser,
    getApplicationStats,
    updateUser
} from '../controllers/user.controller.js'
import { authenticateUser, authorizePermissions } from "../middleware/auth.middleware.js";
import { validateUpdateInput } from "../middleware/validationMiddleware.js";
import upload from '../middleware/multer.middleware.js'

const router = Router()

router.use(authenticateUser)

router.route('/current-user').get(getCurrentUser)
router.route('/admin/app-stats').get(authorizePermissions("admin") ,getApplicationStats)
router.route("/update-user").patch(upload.single('avatar'),validateUpdateInput,updateUser)




export default router