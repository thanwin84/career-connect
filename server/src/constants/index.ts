export const db_name = 'apply-jobs';

export const statusCodes = {
  OK: 200,
  CREATED: 201, // Resource created successfully
  ACCEPTED: 202, // Request accepted for processing
  NO_CONTENT: 204, // No response body required
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401, // Authentication required or failed
  FORBIDDEN: 403, // Permission denied
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405, // Request method not allowed
  CONFLICT: 409, // Conflict with the current state of the target resource
  PRECONDITION_FAILED: 412, // Precondition failed
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501, // Server does not support the functionality
} as const;

export const JOB_STATUS = {
  INTERVIEW: 'interview',
  DECLINED: 'declined',
  SHORTLISTED: 'shortListed',
  APPLIED: 'applied',
  HIRED: 'hired',
  ALL: 'all',
} as const;
export const JOB_TYPE = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship',
  REMORE: 'remote',
  HYBRID: 'hybrid',
  ALL: 'all',
} as const;
export const JOB_SORT_BY = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a',
} as const;
export const experianceLevel = {
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior',
  EXPERT: 'expert',
  JUNIOR: 'junior',
  NONE: 'none',
} as const;

export const UserRoles = {
  GUEST: 'guest',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  PREMIUM_USER: 'premium_user',
  PREMIUM_RECRUITER: 'premium_recruiter',
  USER: 'user',
  USED_UP_FREE_USER: 'used_up_free_user', // user who has used all free features
  USED_UP_FREE_RECRUITER: 'used_up_free_recruiter', // recruiter who has used all free features
} as const;

export const NotificationTypes = {
  JOB_UPDATE: 'job_update',
  JOB_APPLY: 'job_apply',
} as const;
