import { Router } from "express";
import {
    register,
    login,
    logout,
    changePassword,
    reEnterPassword,
    toggleTwoStepAuthentication,
    sendVerificationCode,
    verifyVerificationCode,
    deleteAccount
} from '../controllers/auth.controller'
import {
    validateRegisterInput,
    validateLoginInput,
    validateChangePasswordInput
} from '../middleware/validationMiddleware'
import {authenticateUser} from '../middleware/auth.middleware'
import upload from "../middleware/multer.middleware";

const router = Router()


router.post('/register', upload.single("avatar"), validateRegisterInput, register)

router.post('/login',validateLoginInput, login)

router.route('/logout').get(logout)

router.route("/change-password").patch(authenticateUser, validateChangePasswordInput, changePassword)
router.route("/re-enter-password").post(authenticateUser, reEnterPassword)
router.route("/toggle-two-step-authentication").patch(authenticateUser, toggleTwoStepAuthentication)
router.route("/send-verification-code").post(authenticateUser, sendVerificationCode)
router.route("/verify-code").post(authenticateUser, verifyVerificationCode)
router.route("/delete-account").delete(authenticateUser, deleteAccount)

export default router