import { Router } from "express";
import {
    register,
    login,
    logout,
    changePassword,
    toggleTwoStepAuthentication,
    sendVerificationCode,
    verifyVerificationCode
} from '../controllers/auth.controller.js'
import {
    validateRegisterInput,
    validateLoginInput,
    validateChangePasswordInput
} from '../middleware/validationMiddleware.js'
import {authenticateUser} from '../middleware/auth.middleware.js'

const router = Router()


router.post('/register', validateRegisterInput, register)

router.post('/login',validateLoginInput, login)

router.route('/logout').get(logout)

router.route("/change-password").patch(authenticateUser, validateChangePasswordInput, changePassword)
router.route("/toggle-two-step-authentication").patch(authenticateUser, toggleTwoStepAuthentication)
router.route("/send-verification-code").post(authenticateUser, sendVerificationCode)
router.route("/verify-code").post(authenticateUser, verifyVerificationCode)

export default router