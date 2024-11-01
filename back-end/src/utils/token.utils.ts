import jwt,{JwtPayload} from 'jsonwebtoken'

interface JWTPayload extends JwtPayload {
    userId: string;
    role: string;
}

// export const createJWT = ()=>{
    
//     return jwt.sign(
//         {
//             userId:this._id,
//             role: this.role
//         },
//         process.env.JWT_SECRET as string,
//         {
//             expiresIn: process.env.JWT_EXPIRES_IN
//         }
//     )
// } 

export const verifyJWT = (token:string):JWTPayload | null=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload
        return decoded
    } catch (error) {
        return null
    }
}