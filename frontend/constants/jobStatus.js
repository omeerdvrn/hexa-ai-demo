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

/**
 * Array of all active job status values that needs to be subscribed
 */
export const ACTIVE_JOB_STATUSES = Object.freeze([JobStatus.PROCESSING]);

/**
 * Config data of job statuses
 */
export const JOB_STATUS_CONFIG = Object.freeze({
  processing: {
    title: "Creating Your Design...",
    message: "Ready in 2 minutes",
    messageColor: "#71717A",
    messageBackgroundColor: "#2D2935",
    visualContentType: "loading",
    visualContentBackgroundColor: "#18181B",
  },
  completed: {
    title: "Your Design is Ready!",
    message: "Tap to see it.",
    messageColor: "#D4D4D8",
    messageBackgroundColor: "#2D2935",
    visualContentType: "image",
    visualContentBackgroundColor: "transparent",
  },
  failed: {
    title: "Oops, something went wrong!",
    message: "Click to try again.",
    messageColor: "#D4D4D8",
    messageBackgroundColor: "#EF4444",
    visualContentType: "error",
    visualContentBackgroundColor: "#F37C7C",
  },
});
