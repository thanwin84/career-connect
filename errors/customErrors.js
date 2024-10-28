import { statusCodes } from "../utils/constants.js";

export class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.name = "NotFoundError"
        this.statusCode = statusCodes.NOT_FOUND
    }
}

export class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.name = "BadRequestError"
        this.statusCode = statusCodes.BAD_REQUEST
    }
}

export class UnauthenticatedError extends Error{
    constructor(message){
        super(message)
        this.name = "UnauthenticatedError"
        this.statusCode = statusCodes.UNAUTHORIZED
    }
}
export class UnauthorizedError extends Error{
    constructor(message){
        super(message)
        this.name = "UnauthorizedError"
        this.statusCode = statusCodes.FORBIDDEN
    }
}