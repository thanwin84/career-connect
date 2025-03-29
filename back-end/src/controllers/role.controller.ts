import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  addRoleservice,
  createRoleService,
  getRolesService,
  removeRoleService,
} from '../service/role.service';
import { ApiResponse } from '../utils/ApiResponse';
import { statusCodes } from '../constants';

export const createRole = asyncHandler(async (req: Request, res: Response) => {
  const { role, permissions } = req.body;
  await createRoleService(role, permissions);
  res
    .status(201)
    .json(
      new ApiResponse(statusCodes.CREATED, {}, 'role is created successfully')
    );
});
export const removeRole = asyncHandler(async (req: Request, res: Response) => {
  const { roleId, userId } = req.body;
  await removeRoleService(roleId, userId);
  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Role is removed successfully'));
});
export const addRole = asyncHandler(async (req: Request, res: Response) => {
  const { roleId, userId } = req.body;
  await addRoleservice(roleId, userId);
  res
    .status(200)
    .json(new ApiResponse(statusCodes.OK, {}, 'Role is added successfully'));
});
export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const roles = await getRolesService();
  res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        roles,
        'Roles have been fetched successfully'
      )
    );
});
