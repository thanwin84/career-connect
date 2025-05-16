import mongoose from 'mongoose';
import {
  BadRequestError,
  DuplicateResourceError,
  NotFoundError,
} from '../errors/customErrors';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { addRoleSchema, removeRoleSchema, roleSchema } from '../schemas/role';

export const createRoleService = async (
  role: string,
  permissions: string[]
) => {
  roleSchema.parse({ role, permissions });
  await Role.create({ role, permissions });
};

export const removeRoleService = async (roleId: string, userId: string) => {
  removeRoleSchema.parse({ roleId, userId });
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User is not found');
  }
  const roleExists = user.role.includes(new mongoose.Types.ObjectId(roleId));
  if (!roleExists) {
    throw new NotFoundError(`Role with id ${roleId} does not exists`);
  }
  await User.updateOne(
    { _id: userId },
    {
      $pull: { role: roleId },
    }
  );
};
export const addRoleservice = async (roleId: string, userId: string) => {
  addRoleSchema.parse({ roleId, userId });
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User is not found');
  }
  const roleExists = user.role.includes(new mongoose.Types.ObjectId(roleId));
  if (roleExists) {
    throw new DuplicateResourceError('Role already exists');
  }
  await User.updateOne(
    { _id: userId },
    {
      $addToSet: { role: roleId },
    }
  );
};
export const getRolesService = async () => {
  const roles = await Role.find();
  return roles;
};
