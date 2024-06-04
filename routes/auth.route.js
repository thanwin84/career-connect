import { Router } from "express";
import {
    register,
    login,
    logout
} from '../controllers/auth.controller.js'
import {
    validateRegisterInput,
    validateLoginInput
} from '../middleware/validationMiddleware.js'

const router = Router()


router.post('/register', validateRegisterInput, register)

router.post('/login',validateLoginInput, login)

router.route('/logout').get(logout)

export default router