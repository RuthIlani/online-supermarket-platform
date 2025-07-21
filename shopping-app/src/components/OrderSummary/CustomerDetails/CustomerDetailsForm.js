import { useState, useCallback } from 'react';
import { validateCustomerField } from '../../../utils/validation';
import { CUSTOMER_FORM_FIELDS, FORM_CSS_CLASSES, CUSTOMER_FORM_MESSAGES } from '../../../utils/forms';
import { FormField } from '../../Shared';

/**
 * Security Notice Component
 */
const SecurityNotice = () => (
  <div className="security-notice">
    <p className="main-text">{CUSTOMER_FORM_MESSAGES.SECURITY_NOTICE.MAIN}</p>
    <p className="sub-text">{CUSTOMER_FORM_MESSAGES.SECURITY_NOTICE.SUB}</p>
  </div>
);

const CustomerDetailsForm = ({ customerDetails, onChange }) => {

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Validates a specific field and updates error state
   * @param {string} fieldName - Name of the field to validate
   * @param {string} value - Value to validate
   * @returns {boolean} - True if field is valid, false otherwise
   */
  const handleFieldValidation = useCallback((fieldName, value) => {
    const error = validateCustomerField(fieldName, value);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return error === '';
  }, []);

  /**
   * Handles input changes and triggers validation for touched fields
   */
  const handleInputChange = useCallback((fieldName, value) => {
    // Update parent component state
    onChange(fieldName, value);
    
    // Only validate if field was previously touched (better UX)
    if (touched[fieldName]) {
      handleFieldValidation(fieldName, value);
    }
  }, [onChange, touched, handleFieldValidation]);

  /**
   * Handles field blur events - marks field as touched and validates
   */
  const handleBlur = useCallback((fieldName, value) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
    
    handleFieldValidation(fieldName, value);
  }, [handleFieldValidation]);

  /**
   * Generates appropriate CSS classes for input fields based on validation state
   */
  const getInputClasses = useCallback((fieldName, isTextarea = false) => {
    const baseClasses = `${FORM_CSS_CLASSES.BASE_INPUT} ${isTextarea ? FORM_CSS_CLASSES.TEXTAREA : ''}`;
    
    const hasError = touched[fieldName] && errors[fieldName];
    const isValid = touched[fieldName] && 
                   !errors[fieldName] && 
                   customerDetails[fieldName]?.trim();
    
    if (hasError) {
      return `${baseClasses} ${FORM_CSS_CLASSES.ERROR_STATE}`;
    }
    
    if (isValid) {
      return `${baseClasses} ${FORM_CSS_CLASSES.SUCCESS_STATE}`;
    }
    
    return baseClasses;
  }, [touched, errors, customerDetails]);

  /**
   * Checks if field should show success icon
   */
  const shouldShowSuccessIcon = useCallback((fieldName) => {
    return touched[fieldName] && 
           !errors[fieldName] && 
           customerDetails[fieldName]?.trim();
  }, [touched, errors, customerDetails]);

  /**
   * Checks if field should show error message
   */
  const shouldShowError = useCallback((fieldName) => {
    return touched[fieldName] && errors[fieldName];
  }, [touched, errors]);

  return (
    <div className="customer-details-form" dir="rtl">
      <h2>{CUSTOMER_FORM_MESSAGES.FORM_TITLE}</h2>
      
      <div className="space-y-6">
        {CUSTOMER_FORM_FIELDS.map((field) => (
          <FormField
            key={field.fieldName}
            {...field}
            value={customerDetails[field.fieldName]}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            onBlur={(e) => handleBlur(field.fieldName, e.target.value)}
            className={getInputClasses(field.fieldName, field.isTextarea)}
            shouldShowSuccessIcon={shouldShowSuccessIcon(field.fieldName)}
            shouldShowError={shouldShowError(field.fieldName)}
            errorMessage={errors[field.fieldName]}
          />
        ))}
      </div>

      <SecurityNotice />
    </div>
  );
};

export default CustomerDetailsForm;
