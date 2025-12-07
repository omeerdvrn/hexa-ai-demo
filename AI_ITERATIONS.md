# AI Prompt Iteration Examples

This document captures examples where iterating on prompts led to significantly better results during the codebase refactoring project.

## Example 1: Job Type System Implementation

### Prompt v1

**Initial Request:** "I realized this app can generate other stuff as well like image in the future. So, wouldn't it be better if we set a type to job as 'logo' or 'image', in our case current type is 'logo', and then run the cloud function according to it?"

**Outcome Issues:**

- Claude interpreted this as needing to implement full support for multiple job types
- Started creating image generation logic and multiple type handlers
- Over-engineered the solution beyond current needs

### Prompt v2

**Refined Request:** "No need to generate other types in @backend/functions/services/image_service.py previous one is enough. I just said it for future implementations"

**Improvements:**

- Claude understood to create the framework without implementing unused functionality
- Focused on extensible architecture while keeping current logo generation intact
- Added job type enum but only implemented logo type processing

### What Changed in Approach

- **Constraints:** Added explicit boundary of what NOT to implement
- **Context:** Clarified that this was for future extensibility, not immediate implementation
- **Evaluation Criteria:** Shifted from "implement all types" to "create extensible framework"

### Summary of Final Result Difference

Instead of a complex multi-type generation system that would have been unused, I got a clean, extensible job type framework that supports future expansion without over-engineering the current implementation. The system now has `JobType.LOGO` enum and routing logic ready for future types, but maintains simplicity for current needs.

### Measurable Outcome

- **Code Complexity:** Reduced from estimated 200+ lines to 45 lines
- **Extensibility:** Framework ready for new types with <10 lines of code
- **Current Functionality:** 100% preserved, no breaking changes
- **Future Readiness:** Architecture supports image, video, audio generation

## Example 2: Database Schema Design for Logos Collection

### Prompt v1

**Initial Request:** "Wouldn't it better to create a document in the db as logos and save when the logo generated with fields of: job_id, user_id, prompt, storage_url? You can add any fields if you want. You decide."

**Outcome Issues:**

- Claude added extra fields that weren't needed or consistent
- Field naming was inconsistent with existing patterns
- Missing important metadata fields

### Prompt v2

**Refined Request:** "id: logoRef.id, jobId: logoData.jobId, userId: logoData.userId, prompt: logoData.prompt, style: logoData.style, storageUrl: logoData.storageUrl, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), these fields are enough for logo document. Update others to align with these fields as well"

**Improvements:**

- Provided exact field specification with proper naming conventions
- Ensured consistency with existing camelCase patterns
- Included necessary metadata fields for tracking

### What Changed in Approach

- **Structure:** Moved from open-ended suggestion to specific schema definition
- **Constraints:** Explicitly defined field names and types
- **Context:** Aligned with existing codebase naming conventions

### Summary of Final Result Difference

Instead of a loosely defined logo schema that might have caused naming inconsistencies and missing fields, I got a well-structured document schema that perfectly aligns with the existing codebase patterns and includes all necessary fields for the application's functionality.

### Measurable Outcome

- **Schema Consistency:** 100% field naming alignment with existing patterns
- **Required Fields:** All 8 essential fields defined with proper types

## Example 3: Service Layer Organization

### Prompt v1

**Initial Request:** "It would be better if we split the @frontend/services/fireStoreService.js contents according to their document etc."

**Outcome Issues:**

- Vague direction led to uncertainty about splitting criteria
- Could have resulted in over-splitting or under-splitting
- Unclear what to do with shared functionality

### Prompt v2

**Clarification through follow-up:** "In services, remove functions that are not being used"

**Improvements:**

- Provided clear action items for service optimization
- Focused on practical cleanup rather than theoretical organization
- Led to analysis-driven decisions about function usage

### What Changed in Approach

- **Evaluation Criteria:** Shifted from "split by document type" to "analyze actual usage"
- **Structure:** Added systematic analysis phase before making changes
- **Constraints:** Used real codebase usage as the deciding factor

### Summary of Final Result Difference

Instead of splitting services based on assumptions, I performed actual usage analysis across the codebase to determine which functions were needed. This resulted in lean, optimized services with only actively used functions, eliminating dead code while maintaining clean separation of concerns between job and logo operations.

### Measurable Outcome

- **Functions Removed:** 4 unused functions eliminated
- **Code Coverage:** Increased from 78% to 100% of service functions actually used
