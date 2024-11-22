import {Router} from 'express'
import { authenticateUser } from '../middleware/auth.middleware'
import { sendVerificationCode, verifyVerificationCode } from '../controllers/verification.controller'
import { deleteAccount } from '../controllers/accountSetting.controller'

const router = Router()

router.route("/send-verification-code").post(authenticateUser, sendVerificationCode)
router.route("/verify-code").post(authenticateUser, verifyVerificationCode)
router.route("/delete-account").delete(authenticateUser, deleteAccount)


export default router