import asyncHandler from "../utils/asyncHandler";
import { statusCodes } from "../utils/constants";
import { User, UserDocument } from "../models/user.model";

import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customErrors";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Request, Response, CookieOptions } from "express";
import { ApiResponse } from "../utils/ApiResponse";

declare module "express-serve-static-core" {
  interface Response {
    cookie(name: string, value: string, options?: CookieOptions): this;
  }
}

const register = asyncHandler(async (req: Request, res: Response) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    throw new BadRequestError("User is already registered");
  }
  const localFilePath = req?.file?.path;
  if (localFilePath) {
    const uploadResponse = await uploadOnCloudinary(localFilePath);
    if (uploadResponse) {
      req.body.avatar = {
        publicId: uploadResponse.public_id,
        url: uploadResponse.url,
      };
    }
  }
  const user = await User.create(req.body);

  res
    .status(statusCodes.CREATED)
    .json(
      new ApiResponse(statusCodes.CREATED, {}, "User is created successfully")
    );
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: UserDocument | null = await User.findOne({ email: email });
  if (!user) {
    throw new NotFoundError("user does not exist");
  }
  const isPasswordValid = user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("invalid credentials");
  }
  if (!user.accessStatus) {
    throw new UnauthenticatedError("Access Denied");
  }

  const token = user.generateToken();

  const oneDay = 1000 * 60 * 60 * 24;
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneDay),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };
  user.password = "";
  res
    .status(statusCodes.OK)
    .cookie("token", token, options)
    .json(new ApiResponse(statusCodes.OK, user, "login is successfull"));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };
  res
    .status(statusCodes.OK)
    .clearCookie("token", options)
    .json(new ApiResponse(statusCodes.OK, {}, "logout is successfull"));
});

export { register, login, logout };
