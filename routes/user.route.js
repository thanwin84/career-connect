import { Router } from "express";
import {
    getCurrentUser,
    getApplicationStats,
    updateUser,
    addEducation,
    deleteEducationEntry,
    updateEducationEntry,
    toggleAccessStatus,
    getUsersList,
    addPhoneNumber
} from '../controllers/user.controller.js'
import { authenticateUser, authorizePermissions } from "../middleware/auth.middleware.js";
import { 
    validateUpdateInput,
    validateAddEducationInput 
} from "../middleware/validationMiddleware.js";
import upload from '../middleware/multer.middleware.js'

const router = Router()

router.use(authenticateUser)

router.route("/toggle-access-status/:userId").patch(authorizePermissions("admin"), toggleAccessStatus)
router.route("/get-users-list").get(authorizePermissions("admin"), getUsersList)

router.route('/current-user').get(getCurrentUser)
router.route('/admin/app-stats').get(authorizePermissions("admin") ,getApplicationStats)
router.route("/update-user").patch(upload.single('avatar'),validateUpdateInput,updateUser)
router.route("/add-phone-number").patch(addPhoneNumber)
router.route("/add-education").patch(validateAddEducationInput, addEducation)
router.route("/education/:recordId").patch(deleteEducationEntry)
router.route("/education/:recordId/update-record").patch(validateAddEducationInput, updateEducationEntry)




export default router