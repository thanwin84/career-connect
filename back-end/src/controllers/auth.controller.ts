import asyncHandler from '../utils/asyncHandler';
import { statusCodes } from '../constants';
import { Request, Response, CookieOptions } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { loginUser, registerUser } from '../service/auth.service';

declare module 'express-serve-static-core' {
  interface Response {
    cookie(name: string, value: string, options?: CookieOptions): this;
  }
}

const register = asyncHandler(async (req: Request, res: Response) => {
  await registerUser(req.body, req.file);
  res
    .status(statusCodes.CREATED)
    .json(
      new ApiResponse(statusCodes.CREATED, {}, 'User is created successfully')
    );
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);

  const token = user.generateToken();

  const oneDay = 1000 * 60 * 60 * 24;
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + oneDay),
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };
  user.password = '';
  res
    .status(statusCodes.OK)
    .cookie('token', token, options)
    .json(new ApiResponse(statusCodes.OK, user, 'login is successfull'));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };
  res
    .status(statusCodes.OK)
    .clearCookie('token', options)
    .json(new ApiResponse(statusCodes.OK, {}, 'logout is successfull'));
});

export { register, login, logout };
