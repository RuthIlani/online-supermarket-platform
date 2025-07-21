/**
 * Customer form configuration
 * Centralized configuration for customer-related forms across the application
 * 
 * @fileoverview Form field definitions, styling, and UI messages for customer forms
 * @author Shopping App Team
 */

/**
 * Customer details form field configuration
 * Each field defines its properties for consistent rendering
 */
export const CUSTOMER_FORM_FIELDS = [
  {
    fieldName: 'fullName',
    label: 'שם מלא',
    type: 'text',
    placeholder: 'הכנס שם מלא',
    autoComplete: 'name',
    isTextarea: false,
    required: true
  },
  {
    fieldName: 'address',
    label: 'כתובת מלאה',
    placeholder: 'רחוב, מספר בית, עיר, מיקוד - לדוגמה: הרצל 15, תל אביב 6908512',
    autoComplete: 'street-address',
    isTextarea: true,
    rows: 3,
    required: true
  },
  {
    fieldName: 'email',
    label: 'כתובת אימייל',
    type: 'email',
    placeholder: 'example@email.com',
    autoComplete: 'email',
    isTextarea: false,
    required: true
  }
];

/**
 * CSS class constants for consistent styling
 * Centralized class names for form elements
 */
export const FORM_CSS_CLASSES = {
  BASE_INPUT: 'form-input',
  TEXTAREA: 'form-textarea',
  ERROR_STATE: 'border-red-300',
  SUCCESS_STATE: 'border-green-300',
  
  // Additional classes for better organization
  FORM_GROUP: 'form-group',
  INPUT_WRAPPER: 'input-wrapper',
  SUCCESS_ICON: 'success-icon',
  ERROR_MESSAGE: 'error-message',
  REQUIRED_INDICATOR: 'required'
};

/**
 * Form UI messages and text content
 * Centralized text content for internationalization support
 */
export const CUSTOMER_FORM_MESSAGES = {
  SECURITY_NOTICE: {
    MAIN: '🛡️ המידע שלך מוגן ומאובטח',
    SUB: 'כל השדות המסומנים בכוכבית (*) הם חובה למילוי'
  },
  FORM_TITLE: 'פרטי לקוח',
  LOADING_STATES: {
    SUBMITTING: 'שולח הזמנה...',
    VALIDATING: 'בודק פרטים...'
  },
  SUCCESS_INDICATORS: {
    FIELD_VALID: '✓',
    FORM_COMPLETE: 'כל הפרטים הוכנסו בהצלחה'
  },
  ERROR_INDICATORS: {
    FIELD_ERROR: '⚠',
    FORM_INCOMPLETE: 'אנא מלא את כל השדות הנדרשים'
  }
};

/**
 * Form layout configuration
 * Settings for form layout and behavior
 */
export const CUSTOMER_FORM_CONFIG = {
  DIRECTION: 'rtl', // Hebrew text direction
  VALIDATE_ON_BLUR: true,
  VALIDATE_ON_CHANGE: true, // Only for touched fields
  SHOW_SUCCESS_INDICATORS: true,
  AUTO_FOCUS_FIRST_ERROR: true
};

/**
 * Gets form field configuration by field name
 * @param {string} fieldName - The field name to find
 * @returns {Object|null} - Field configuration object or null if not found
 */
export const getCustomerFieldConfig = (fieldName) => {
  return CUSTOMER_FORM_FIELDS.find(field => field.fieldName === fieldName) || null;
};

/**
 * Gets all required field names
 * @returns {string[]} - Array of required field names
 */
export const getRequiredCustomerFieldNames = () => {
  return CUSTOMER_FORM_FIELDS
    .filter(field => field.required)
    .map(field => field.fieldName);
};

/**
 * Checks if a field is configured as textarea
 * @param {string} fieldName - The field name to check
 * @returns {boolean} - True if field is textarea, false otherwise
 */
export const isCustomerFieldTextarea = (fieldName) => {
  const fieldConfig = getCustomerFieldConfig(fieldName);
  return fieldConfig ? fieldConfig.isTextarea : false;
};
