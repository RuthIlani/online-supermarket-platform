import React from 'react';

/**
 * Reusable Form Field Component
 * A flexible input field component that supports both text inputs and textareas
 * with validation states, success/error indicators, and customizable styling
 * 
 * @component
 * @example
 * <FormField
 *   fieldName="email"
 *   label="Email Address"
 *   type="email"
 *   value={email}
 *   onChange={handleChange}
 *   shouldShowError={hasError}
 *   errorMessage="Invalid email"
 * />
 */
const FormField = ({ 
  fieldName, 
  label, 
  type = 'text', 
  placeholder, 
  autoComplete, 
  rows,
  isTextarea = false,
  value,
  onChange,
  onBlur,
  className,
  shouldShowSuccessIcon = false,
  shouldShowError = false,
  errorMessage,
  required = true,
  disabled = false,
  maxLength,
  minLength
}) => {
  const InputComponent = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className="form-group">
      <label htmlFor={fieldName} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      
      <div className="input-wrapper">
        <InputComponent
          type={!isTextarea ? type : undefined}
          id={fieldName}
          name={fieldName}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={isTextarea ? rows : undefined}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          aria-invalid={shouldShowError ? 'true' : 'false'}
          aria-describedby={shouldShowError ? `${fieldName}-error` : undefined}
        />
        
        {shouldShowSuccessIcon && (
          <div 
            className={`success-icon ${isTextarea ? 'textarea-icon' : ''}`}
            aria-label="Field is valid"
          >
            <span>✓</span>
          </div>
        )}
      </div>
      
      {shouldShowError && (
        <p 
          id={`${fieldName}-error`}
          className="error-message"
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">⚠</span>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormField;
