import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js"
import { verifyJWT } from "../utils/token.utils.js"

export const authenticateUser = async (req, res, next)=>{
    const {token} = req.cookies
    console.log("token",token)
    if (!token){
        return next(new UnauthenticatedError("authentication invalid"))
        
    }
    try {
        const {userId, role} = verifyJWT(token)
        req.user = {userId, role}
        next()
    } catch (error) {
        return next(new UnauthenticatedError("authentication invalid"))
        
    } 
}

export const authorizePermissions = (...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized to access this route")
            
        }
        next()
    }
}