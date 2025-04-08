import { UserRoles } from '../constants';
import { permissions } from '../constants/permissions';
import { Role } from '../models/role.model';
import { logger } from '../utils/logger';

export const populateRoles = async () => {
  const existingRoles = await Role.countDocuments();
  if (existingRoles) {
    logger.info('Roles already exists, skipping seeding');
    return;
  }
  try {
    await Role.insertMany([
      {
        role: UserRoles.ADMIN,
        permissions: [
          permissions.USER_ACCOUNT_DELETE,
          permissions.OTHER_PROFILE_VIEW,
          permissions.JOB_DELETE,
          permissions.JOB_CREATE,
          permissions.VIEW_ADMIN_DASHBOARD,
          permissions.ROle_ASSIGN,
        ],
      },
      {
        role: UserRoles.USER,
        permissions: [
          permissions.APPLICATION_CREATE,
          permissions.OTHER_PROFILE_VIEW,
        ],
      },
      {
        role: UserRoles.PREMIUM_USER,
        permissions: [
          permissions.APPLICATION_CREATE,
          permissions.OTHER_PROFILE_VIEW,
          permissions.JOB_VIEW,
        ],
      },
      {
        role: UserRoles.USED_UP_FREE_USER,
        permissions: [],
      },
      {
        role: UserRoles.RECRUITER,
        permissions: [
          permissions.JOB_CREATE,
          permissions.APPLICATION_UPDATE,
          permissions.APPLICATION_DELETE,
          permissions.OTHER_PROFILE_VIEW,
        ],
      },
      {
        role: UserRoles.USED_UP_FREE_RECRUITER,
        permissions: [permissions.OTHER_PROFILE_VIEW],
      },
    ]);
  } catch (error) {
    console.log('Error has occured while seeding', error);
  }
};
