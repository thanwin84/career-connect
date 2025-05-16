export const appConfig = {
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  VITE_BACkEND_URL: import.meta.env.VITE_BACkEND_URL,
  EMAIL_VERIFICATION_EXPIRY_TIME: import.meta.env
    .VITE_EMAIL_VERIFICATION_EXPIRY_TIME,
};

export const constants = {
  JOB_STATUS: {
    INTERVIEW: 'interview',
    DECLINED: 'declined',
    SHORTLISTED: 'shortListed',
    APPLIED: 'applied',
    HIRED: 'hired',
    ALL: 'all',
  } as const,
  JOB_TYPE: {
    FULL_TIME: 'full-time',
    PART_TIME: 'part-time',
    INTERNSHIP: 'internship',
    REMORE: 'remote',
    HYBRID: 'hybrid',
  } as const,
  JOB_SORT_BY: {
    NEWEST_FIRST: 'newest',
    OLDEST_FIRST: 'oldest',
    ASCENDING: 'a-z',
    DESCENDING: 'z-a',
  } as const,
  experianceLevel: {
    ENTRY: 'entry',
    MID: 'mid',
    SENIOR: 'senior',
    EXPERT: 'expert',
  } as const,
  UserRoles: {
    GUEST: 'guest',
    RECRUITER: 'recruiter',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    PREMIUM_USER: 'premium_user',
    PREMIUM_RECRUITER: 'premium_recruiter',
    USER: 'user',
  } as const,
};
