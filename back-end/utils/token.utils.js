import jwt from 'jsonwebtoken'

export const createJWT = ()=>{
    
    return jwt.sign(
        {
            userId:this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

export const verifyJWT = (token)=>{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}