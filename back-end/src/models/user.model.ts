import mongoose, { InferSchemaType, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
    trim: true,
  },
  startMonth: {
    type: String,
    required: true,
    trim: true,
  },
  startYear: {
    type: String,
    required: true,
    trim: true,
  },
  endMonth: String,
  endYear: String,
  currentlyStudying: {
    type: Boolean,
    default: false,
  },
});

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  publicId: {
    type: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: 'Not Available',
    },
    avatar: imageSchema,
    coverPhoto: imageSchema,
    educationRecords: [educationSchema],
    // only admin can change this
    accessStatus: {
      type: Boolean,
      default: true,
    },
    twoStepAuthentication: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
    },
    isDeleted: {
      type: Date,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifyToken: String,
    emailVerifyTokenExpiry: {
      type: Date,
      default: null,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    role: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  const response = await bcrypt.compare(password, this.password);
  return response;
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
type UserMethods = {
  isPasswordCorrect: (password: string) => boolean;
  generateToken: () => void;
};
type UserT = InferSchemaType<typeof userSchema>;
export interface UserDocument extends UserT, Document, UserMethods {}
export const User = mongoose.model('User', userSchema);
