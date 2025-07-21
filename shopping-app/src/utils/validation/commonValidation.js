/**
 * Common validation utilities
 * Reusable validation functions that can be used across the application
 * 
 * @fileoverview Generic validation helpers for various data types
 * @author Shopping App Team
 */

/**
 * Common validation patterns
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^0\d{1,2}-?\d{7}$/,
  ISRAELI_ID: /^\d{9}$/,
  HEBREW_TEXT: /^[א-ת\s]+$/,
  ENGLISH_TEXT: /^[a-zA-Z\s]+$/,
  HEBREW_ENGLISH_TEXT: /^[א-תa-zA-Z\s]+$/,
  NUMERIC: /^\d+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/
};

/**
 * Common validation functions
 */

/**
 * Validates if value is not empty
 * @param {string} value - Value to validate
 * @returns {boolean} - True if not empty, false otherwise
 */
export const isNotEmpty = (value) => {
  return Boolean(value?.trim());
};

/**
 * Validates minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} - True if meets minimum length, false otherwise
 */
export const hasMinLength = (value, minLength) => {
  const trimmed = value?.trim() || '';
  return trimmed.length >= minLength;
};

/**
 * Validates maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} - True if within maximum length, false otherwise
 */
export const hasMaxLength = (value, maxLength) => {
  const trimmed = value?.trim() || '';
  return trimmed.length <= maxLength;
};

/**
 * Validates against a regex pattern
 * @param {string} value - Value to validate
 * @param {RegExp} pattern - Regex pattern to test against
 * @returns {boolean} - True if matches pattern, false otherwise
 */
export const matchesPattern = (value, pattern) => {
  const trimmed = value?.trim() || '';
  return pattern.test(trimmed);
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format, false otherwise
 */
export const isValidEmail = (email) => {
  return matchesPattern(email, VALIDATION_PATTERNS.EMAIL);
};

/**
 * Validates Israeli phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format, false otherwise
 */
export const isValidIsraeliPhone = (phone) => {
  return matchesPattern(phone, VALIDATION_PATTERNS.PHONE);
};

/**
 * Validates Hebrew text only
 * @param {string} text - Text to validate
 * @returns {boolean} - True if contains only Hebrew characters and spaces
 */
export const isValidHebrewText = (text) => {
  return matchesPattern(text, VALIDATION_PATTERNS.HEBREW_TEXT);
};

/**
 * Validates Hebrew or English text
 * @param {string} text - Text to validate
 * @returns {boolean} - True if contains only Hebrew/English characters and spaces
 */
export const isValidHebrewEnglishText = (text) => {
  return matchesPattern(text, VALIDATION_PATTERNS.HEBREW_ENGLISH_TEXT);
};

/**
 * Generic field validator creator
 * Creates a validation function based on rules
 * @param {Object} rules - Validation rules
 * @param {boolean} rules.required - Is field required
 * @param {number} rules.minLength - Minimum length
 * @param {number} rules.maxLength - Maximum length
 * @param {RegExp} rules.pattern - Regex pattern
 * @param {Object} rules.messages - Error messages
 * @returns {Function} - Validation function
 */
export const createValidator = (rules) => {
  return (value) => {
    const trimmed = value?.trim() || '';
    
    // Check required
    if (rules.required && !trimmed) {
      return rules.messages?.required || 'שדה זה הוא חובה';
    }
    
    // Skip other validations if field is empty and not required
    if (!trimmed && !rules.required) {
      return '';
    }
    
    // Check minimum length
    if (rules.minLength && !hasMinLength(trimmed, rules.minLength)) {
      return rules.messages?.minLength || `נדרש לפחות ${rules.minLength} תווים`;
    }
    
    // Check maximum length
    if (rules.maxLength && !hasMaxLength(trimmed, rules.maxLength)) {
      return rules.messages?.maxLength || `מקסימום ${rules.maxLength} תווים`;
    }
    
    // Check pattern
    if (rules.pattern && !matchesPattern(trimmed, rules.pattern)) {
      return rules.messages?.pattern || 'פורמט שדה אינו תקין';
    }
    
    return '';
  };
};

/**
 * Validates multiple fields at once
 * @param {Object} data - Object containing field values
 * @param {Object} validators - Object containing field validators
 * @returns {Object} - Object containing errors for each field
 */
export const validateFields = (data, validators) => {
  const errors = {};
  
  Object.keys(validators).forEach(fieldName => {
    const validator = validators[fieldName];
    const value = data[fieldName];
    const error = validator(value);
    
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * Checks if validation result has any errors
 * @param {Object} errors - Validation errors object
 * @returns {boolean} - True if no errors, false if there are errors
 */
export const isValidationClean = (errors) => {
  return Object.keys(errors).length === 0;
};

/**
 * Utility to format validation error messages for display
 * @param {Object} errors - Errors object
 * @returns {string[]} - Array of formatted error messages
 */
export const formatValidationErrors = (errors) => {
  return Object.entries(errors)
    .filter(([, message]) => message)
    .map(([field, message]) => `${field}: ${message}`);
};
