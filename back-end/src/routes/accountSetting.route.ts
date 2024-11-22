import { changePassword, reEnterPassword, toggleTwoStepAuthentication } from "../controllers/accountSetting.controller"
import { authenticateUser } from "../middleware/auth.middleware"
import { validateChangePasswordInput } from "../middleware/validationMiddleware"
import {Router} from 'express'

const router = Router()


router.route("/change-password").patch(authenticateUser, validateChangePasswordInput, changePassword)
router.route("/re-enter-password").post(authenticateUser, reEnterPassword)
router.route("/toggle-two-step-authentication").patch(authenticateUser, toggleTwoStepAuthentication)

export default router