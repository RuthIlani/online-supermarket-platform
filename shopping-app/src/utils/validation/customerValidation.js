/**
 * Customer validation utilities
 * Reusable validation logic for customer-related data across the application
 * 
 * @fileoverview Centralized customer validation with i18n support
 * @author Shopping App Team
 */

import i18n from '../../i18n';

// Customer-specific validation rules
export const CUSTOMER_VALIDATION_RULES = {
  FULL_NAME: {
    MIN_LENGTH: 2,
    PATTERN: /^[א-תa-zA-Z\s]+$/,
    ERROR_MESSAGES: {
      get REQUIRED() { return i18n.t('validation.fullName.required'); },
      get MIN_LENGTH() { return i18n.t('validation.fullName.minLength'); },
      get INVALID_PATTERN() { return i18n.t('validation.fullName.invalidPattern'); }
    }
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ERROR_MESSAGES: {
      get REQUIRED() { return i18n.t('validation.email.required'); },
      get INVALID_FORMAT() { return i18n.t('validation.email.invalidFormat'); }
    }
  },
  ADDRESS: {
    MIN_LENGTH: 10,
    ERROR_MESSAGES: {
      get REQUIRED() { return i18n.t('validation.address.required'); },
      get MIN_LENGTH() { return i18n.t('validation.address.minLength'); }
    }
  }
};

/**
 * Validates customer full name
 * @param {string} value - The full name value to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateCustomerFullName = (value) => {
  const trimmed = value?.trim() || '';
  
  if (!trimmed) {
    return CUSTOMER_VALIDATION_RULES.FULL_NAME.ERROR_MESSAGES.REQUIRED;
  }
  
  if (trimmed.length < CUSTOMER_VALIDATION_RULES.FULL_NAME.MIN_LENGTH) {
    return CUSTOMER_VALIDATION_RULES.FULL_NAME.ERROR_MESSAGES.MIN_LENGTH;
  }
  
  if (!CUSTOMER_VALIDATION_RULES.FULL_NAME.PATTERN.test(trimmed)) {
    return CUSTOMER_VALIDATION_RULES.FULL_NAME.ERROR_MESSAGES.INVALID_PATTERN;
  }
  
  return '';
};

/**
 * Validates customer email
 * @param {string} value - The email value to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateCustomerEmail = (value) => {
  const trimmed = value?.trim() || '';
  
  if (!trimmed) {
    return CUSTOMER_VALIDATION_RULES.EMAIL.ERROR_MESSAGES.REQUIRED;
  }
  
  if (!CUSTOMER_VALIDATION_RULES.EMAIL.PATTERN.test(trimmed)) {
    return CUSTOMER_VALIDATION_RULES.EMAIL.ERROR_MESSAGES.INVALID_FORMAT;
  }
  
  return '';
};

/**
 * Validates customer address
 * @param {string} value - The address value to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateCustomerAddress = (value) => {
  const trimmed = value?.trim() || '';
  
  if (!trimmed) {
    return CUSTOMER_VALIDATION_RULES.ADDRESS.ERROR_MESSAGES.REQUIRED;
  }
  
  if (trimmed.length < CUSTOMER_VALIDATION_RULES.ADDRESS.MIN_LENGTH) {
    return CUSTOMER_VALIDATION_RULES.ADDRESS.ERROR_MESSAGES.MIN_LENGTH;
  }
  
  return '';
};

/**
 * Customer field validators map for easy access
 * Maps field names to their corresponding validation functions
 */
export const CUSTOMER_FIELD_VALIDATORS = {
  fullName: validateCustomerFullName,
  email: validateCustomerEmail,
  address: validateCustomerAddress
};

/**
 * Validates a single customer field using the appropriate validator
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateCustomerField = (fieldName, value) => {
  const validator = CUSTOMER_FIELD_VALIDATORS[fieldName];
  
  if (!validator) {
    console.warn(`No customer validator found for field: ${fieldName}`);
    return '';
  }
  
  return validator(value);
};

/**
 * Validates all customer details fields at once
 * @param {Object} customerDetails - Object containing all customer details
 * @param {string} customerDetails.fullName - Customer's full name
 * @param {string} customerDetails.email - Customer's email address
 * @param {string} customerDetails.address - Customer's address
 * @returns {Object} - Object containing field names as keys and error messages as values
 */
export const validateAllCustomerFields = (customerDetails = {}) => {
  const errors = {};
  
  Object.keys(CUSTOMER_FIELD_VALIDATORS).forEach(fieldName => {
    const error = validateCustomerField(fieldName, customerDetails[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * Checks if all customer details are valid
 * @param {Object} customerDetails - Object containing all customer details
 * @returns {boolean} - True if all fields are valid, false otherwise
 */
export const isCustomerFormValid = (customerDetails = {}) => {
  const errors = validateAllCustomerFields(customerDetails);
  return Object.keys(errors).length === 0;
};

/**
 * Gets all required customer field names
 * @returns {string[]} - Array of required field names
 */
export const getRequiredCustomerFields = () => {
  return Object.keys(CUSTOMER_FIELD_VALIDATORS);
};

/**
 * Validates customer data for order submission
 * Enhanced validation that can be used throughout the app
 * @param {Object} customerDetails - Customer details object
 * @returns {Object} - Validation result with isValid flag and errors
 */
export const validateCustomerForOrder = (customerDetails) => {
  const errors = validateAllCustomerFields(customerDetails);
  const isValid = Object.keys(errors).length === 0;
  
  return {
    isValid,
    errors,
    missingFields: isValid ? [] : Object.keys(errors)
  };
};
