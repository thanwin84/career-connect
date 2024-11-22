import { statusCodes } from "../utils/constants";

export class NotFoundError extends Error{
    statusCode: number
    constructor(message:string){
        super(message)
        this.name = "NotFoundError"
        this.statusCode = statusCodes.NOT_FOUND
    }
}
export class ForbiddenError extends Error{
    statusCode: number
    constructor(message:string){
        super(message)
        this.name = "ForbiddenError"
        this.statusCode = statusCodes.FORBIDDEN
    }
}

export class BadRequestError extends Error{
    statusCode: number
    constructor(message:string){
        super(message)
        this.name = "BadRequestError"
        this.statusCode = statusCodes.BAD_REQUEST
    }
}

export class UnauthenticatedError extends Error{
    statusCode: number
    constructor(message:string){
        super(message)
        this.name = "UnauthenticatedError"
        this.statusCode = statusCodes.UNAUTHORIZED
    }
}
export class UnauthorizedError extends Error{
    statusCode: number
    constructor(message:string){
        super(message)
        this.name = "UnauthorizedError"
        this.statusCode = statusCodes.FORBIDDEN
    }
}