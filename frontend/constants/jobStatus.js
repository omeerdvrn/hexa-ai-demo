/**
 * Job status enumeration
 * Represents the different states a logo generation job can be in
 * @typedef {string} JobStatusValue
 */
export const JobStatus = Object.freeze({
  IDLE: "idle",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
});

/**
 * Array of all job status values for iteration
 */
export const JOB_STATUSES = Object.freeze(Object.values(JobStatus));
