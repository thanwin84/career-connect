import { NextFunction, Request, Response } from 'express';
import { statusCodes } from '../constants';
import { logger } from '../utils/logger';

interface CustomError extends Error {
  statusCode?: number;
}
const maskSessitiveData = (body: Record<string, any>) => {
  if (!body) {
    return {};
  }
  const filteredBody = { ...body };
  if (filteredBody.password) {
    filteredBody.password = '******';
  }
  return filteredBody;
};
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message || 'Intenal Server Error',
    statusCodes: err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
    stack: err.stack,
    method: req.method,
    url: maskSessitiveData(req.body),
    params: req.params,
    query: req.query,
  });
  res.status(err.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

export default errorHandler;
