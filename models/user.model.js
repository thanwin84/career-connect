import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const educationSchema = new mongoose.Schema({
    school: String,
    department: String,
    degree: String,
    startMonth: String,
    startYear: String,
    endMonth: String,
    endYear: String,
    currentlyStudying: {
        type: Boolean,
        default: false
    }
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
    },
    location: {
        type: String,
        default: "my city"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    avatar: {
        type: [String] //cloudinary url-avatar:[url, publicId]
    },
    educationRecords: [educationSchema],
    // only admin can change this
    accessStutus: {
        type: Boolean,
        default: true
    },
    twoStepAuthentication: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String
    }
})

userSchema.pre('save', async function(next){
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } else {
        next()
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    const response = await bcrypt.compare(password, this.password)
    return response
}

userSchema.methods.generateToken = function(){
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
export const User = mongoose.model('User', userSchema)