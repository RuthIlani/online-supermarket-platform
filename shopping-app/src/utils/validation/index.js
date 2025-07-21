/**
 * Validation utilities index
 * Centralized exports for all validation functions
 */

// Customer validation
export {
  CUSTOMER_VALIDATION_RULES,
  validateCustomerField,
  validateCustomerFullName,
  validateCustomerEmail,
  validateCustomerAddress,
  validateAllCustomerFields,
  isCustomerFormValid,
  getRequiredCustomerFields,
  validateCustomerForOrder,
  CUSTOMER_FIELD_VALIDATORS
} from './customerValidation';

// Common validation utilities
export {
  VALIDATION_PATTERNS,
  isNotEmpty,
  hasMinLength,
  hasMaxLength,
  matchesPattern,
  isValidEmail,
  isValidIsraeliPhone,
  isValidHebrewText,
  isValidHebrewEnglishText,
  createValidator,
  validateFields,
  isValidationClean,
  formatValidationErrors
} from './commonValidation';
