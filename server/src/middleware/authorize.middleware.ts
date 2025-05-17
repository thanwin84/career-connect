import { NextFunction, Request, Response } from 'express';
import { Permissions } from '../constants/permissions';
import { NotFoundError, UnauthorizedError } from '../errors/customErrors';
import { User } from '../models/user.model';
import { RoleType } from '../models/role.model';
import mongoose from 'mongoose';

export const authorize = (requiredPermission: Permissions) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }
    const users = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $project: {
          role: 1,
          _id: 0,
        },
      },
    ]);
    if (users.length === 0) {
      next(new NotFoundError(`user with id ${userId} is not found`));
    }
    const roles = users[0].role as RoleType[];

    let hasPermission = false;
    roles.forEach((item) => {
      const checkPermission = item.permissions.includes(requiredPermission);
      if (checkPermission) {
        hasPermission = true;
      }
    });
    if (hasPermission) {
      next();
    } else {
      next(
        new UnauthorizedError('You are not authorized to perform this action')
      );
    }
  };
};
