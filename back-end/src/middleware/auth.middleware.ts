import { NextFunction, Request, Response } from "express"
import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors"
import { verifyJWT } from "../utils/token.utils"

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string
                role: string
            }
        }
    }
}

export const authenticateUser = async (req: Request, res:Response, next:NextFunction)=>{
    const {token} = req.cookies
    if (!token){
        return next(new UnauthenticatedError("authentication invalid"))
        
    }
    const decoded = verifyJWT(token)
    if (!decoded){
        return next(new UnauthenticatedError("authentication invalid"))
    }
    const {userId, role} = decoded
    req.user = {userId, role}
    next()
}

export const authorizePermissions = (...roles:string[])=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        if (!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized to access this route")
            
        }
        next()
    }
}