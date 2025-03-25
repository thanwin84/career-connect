// constants/permissions.ts
export const permissions = {
  ALL_PERMISSION: 'all',
  JOB_CREATE: 'job:create',
  JOB_UPDATE: 'job:update',
  JOB_DELETE: 'job:delete',
  JOB_VIEW: 'job:view',
  APPLICATION_VIEW: 'application:view',
  APPLICATION_CREATE: 'application:create',
  APPLICATION_UPDATE: 'application:update',
  APPLICATION_DELETE: 'application:delete',
  CANDIDATE_SHORTLIST: 'candidate:shortlist',
  CANDIDATE_VIEW: 'candidate:view',
  OTHER_PROFILE_VIEW: 'profile:view',
  PROFILE_UPDATE: 'profile:update',
  ACCOUNT_DELETE: 'account:delete',
  USER_ACCOUNT_DELETE: 'user:delete',
  VIEW_ADMIN_DASHBOARD: 'view:dashboard',
};
export type Permissions = (typeof permissions)[keyof typeof permissions];
