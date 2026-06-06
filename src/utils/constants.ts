/**
 * Shared constants and utilities for resume analysis
 * Centralizes hardcoded values to reduce duplication and improve maintainability
 */

// Common stop words used in keyword extraction (prevents duplicating across multiple files)
export const COMMON_STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'must',
  'this', 'that', 'these', 'those', 'it', 'its', 'we', 'you', 'your',
  'our', 'their', 'who', 'which', 'what', 'where', 'when', 'how',
  'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
  'some', 'such', 'no', 'not', 'only', 'same', 'so', 'than', 'too',
  'very', 'just', 'about', 'above', 'after', 'again', 'also', 'any',
  'because', 'before', 'between', 'during', 'into', 'through',
  'ability', 'able', 'experience', 'work', 'working', 'team', 'role',
  'position', 'company', 'looking', 'seeking', 'required', 'preferred',
  'including', 'within', 'across', 'strong', 'excellent', 'good'
]);

// Improved email regex pattern that handles common email formats
export const EMAIL_PATTERN = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;

// Phone number regex with better international format support
export const PHONE_PATTERN = /(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}|\b(?:\+?1[-.]?)?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})\b|(?:\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/;

// URL patterns
export const URL_PATTERN = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;

// ATS Scoring weights - these should match the scoring algorithm
export const ATS_SCORE_WEIGHTS = {
  KEYWORD_MATCH: 0.45,    // Keyword matching is most critical
  FORMAT: 0.25,           // Format matters for ATS parsing
  CONTENT: 0.30           // Content quality is important
} as const;

// Validation constraints
export const VALIDATION_CONSTRAINTS = {
  MIN_RESUME_LENGTH: 50,                    // Minimum characters for a valid resume
  MAX_RESUME_LENGTH: 50000,                 // Prevent memory issues with huge texts
  MIN_JOB_DESCRIPTION_LENGTH: 50,           // Minimum JD length
  MAX_KEYWORDS_TO_SHOW: 40,                 // Limit keywords in extraction
  MAX_SUGGESTIONS: 8,                       // Maximum suggestions to show user
  MAX_KEYWORD_DENSITY_ENTRIES: 100,         // Limit keywordDensity output
  MAX_PDF_FILE_SIZE: 10 * 1024 * 1024       // 10MB max PDF size
} as const;

// Industry detection keywords
export const INDUSTRY_KEYWORDS = {
  'technology': ['software', 'tech', 'saas', 'platform', 'digital', 'development', 'engineering'],
  'finance': ['fintech', 'banking', 'financial', 'investment', 'trading', 'capital', 'assets'],
  'healthcare': ['health', 'medical', 'clinical', 'patient', 'pharma', 'hospital', 'care'],
  'education': ['education', 'learning', 'academic', 'university', 'school', 'course', 'student'],
  'ecommerce': ['ecommerce', 'retail', 'marketplace', 'shopping', 'merchant', 'commerce', 'store']
} as const;

/**
 * Sanitizes input text for analysis
 * @param text - Raw user input
 * @returns Trimmed and validated text
 */
export function sanitizeInput(text: string): string {
  if (!text) return '';
  return text.trim().slice(0, VALIDATION_CONSTRAINTS.MAX_RESUME_LENGTH);
}

/**
 * Validates if text is substantial enough for analysis
 * @param text - Text to validate
 * @param minLength - Minimum acceptable length
 * @returns true if text is valid
 */
export function isValidInput(text: string, minLength = VALIDATION_CONSTRAINTS.MIN_RESUME_LENGTH): boolean {
  return text && text.trim().length >= minLength;
}

/**
 * Escapes special regex characters
 * @param str - String to escape
 * @returns Escaped string safe for use in regex
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Clamps a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
