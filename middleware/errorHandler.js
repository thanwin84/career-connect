import { statusCodes } from "../utils/constants.js"

const errorHandler = (err, req, res, next)=>{
    
    res.status(err.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
        {
            success: false,
            message: err.message || "Internal server error"
        }
    )
}

export default errorHandler