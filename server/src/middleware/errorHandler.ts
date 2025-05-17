import { NextFunction, Request, Response } from 'express';
import { statusCodes } from '../constants';
import { logger } from '../utils/logger';
import { z } from 'zod';

interface CustomError extends Error {
  statusCode?: number;
}
const maskSessitiveData = (body: Record<string, string>) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
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

  if (err instanceof z.ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      message: formattedErrors,
    });
  }
  res.status(err.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

export default errorHandler;
