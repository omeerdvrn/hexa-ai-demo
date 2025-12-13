/**
 * Services index - exports all Firestore services
 * Provides clean, organized access to database operations
 */

// For backward compatibility, you can also create a combined service
// that exports all methods (optional)
import jobService from "./jobService";
import logoService from "./logoService";

export { default as jobService } from "./jobService";
export { default as logoService } from "./logoService";

export const firestoreService = {
  // Job methods
  ...jobService,

  // Logo methods
  ...logoService,
};

export default firestoreService;
