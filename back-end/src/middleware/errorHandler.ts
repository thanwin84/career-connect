import { NextFunction, Request, Response } from "express";
import { statusCodes } from "../utils/constants";

interface CustomError extends Error {
  statusCode?: number;
}
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(err.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

export default errorHandler;
