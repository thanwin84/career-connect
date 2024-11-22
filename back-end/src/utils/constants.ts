const db_name = "apply-jobs"

const statusCodes = {
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
} as const 

const JOB_STATUS = {
    PENDING: 'pending',
    INTERVIEW: 'interview',
    DECLINED: 'declined'
} as const
const JOB_TYPE = {
    FULL_TIME: 'full-time',
    PART_TIME: 'part-time',
    INTERNSHIP: 'internship',
    REMORE: 'remote',
    HYBRID: 'hybrid'
} as const
const JOB_SORT_BY = {
    NEWEST_FIRST: 'newest',
    OLDEST_FIRST: 'oldest',
    ASCENDING: 'a-z',
    DESCENDING: 'z-a'
} as const
const experianceLevel = {
    ENTRY: 'entry',
    MID: 'mid',
    SENIOR: 'senior',
    EXPERT: 'expert' 
} as const


export {
    db_name,
    statusCodes,
    JOB_STATUS,
    JOB_TYPE,
    JOB_SORT_BY,
    experianceLevel
}