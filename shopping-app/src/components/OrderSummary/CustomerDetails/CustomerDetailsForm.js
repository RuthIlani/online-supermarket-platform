import React, { useState } from 'react';

const CustomerDetailsForm = ({ customerDetails, onChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return 'שם מלא הוא שדה חובה';
    if (name.trim().length < 2) return 'שם חייב להכיל לפחות 2 תווים';
    if (!/^[א-תa-zA-Z\s]+$/.test(name.trim())) return 'שם יכול להכיל רק אותיות ורווחים';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'אימייל הוא שדה חובה';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'פורמט האימייל אינו תקין';
    return '';
  };

  const validateAddress = (address) => {
    if (!address.trim()) return 'כתובת היא שדה חובה';
    if (address.trim().length < 10) return 'אנא הכנס כתובת מלאה (לפחות 10 תווים)';
    return '';
  };

  const validateField = (fieldName, value) => {
    let error = '';
    switch (fieldName) {
      case 'fullName':
        error = validateFullName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'address':
        error = validateAddress(value);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return error === '';
  };

  const handleInputChange = (fieldName, value) => {
    onChange(fieldName, value);
    
    // Only validate if field was previously touched
    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleBlur = (fieldName, value) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
    validateField(fieldName, value);
  };

  const getInputClasses = (fieldName, isTextarea = false) => {
    const baseClasses = `form-input ${isTextarea ? 'form-textarea' : ''}`;
    
    const hasError = touched[fieldName] && errors[fieldName];
    
    if (hasError) {
      return `${baseClasses} border-red-300`;
    }
    
    const isValid = touched[fieldName] && !errors[fieldName] && customerDetails[fieldName]?.trim();
    if (isValid) {
      return `${baseClasses} border-green-300`;
    }
    
    return baseClasses;
  };

  return (
    <div className="customer-details-form" dir="rtl">
      <h2>פרטי לקוח</h2>
      
      <div className="space-y-6">
        {/* Full Name Field */}
        <div className="form-group">
          <label htmlFor="fullName">
            שם מלא <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="fullName"
              value={customerDetails.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              onBlur={(e) => handleBlur('fullName', e.target.value)}
              className={getInputClasses('fullName')}
              placeholder="הכנס שם מלא"
              autoComplete="name"
              required
            />
            {touched.fullName && !errors.fullName && customerDetails.fullName?.trim() && (
              <div className="success-icon">
                <span>✓</span>
              </div>
            )}
          </div>
          {touched.fullName && errors.fullName && (
            <p className="error-message">
              <span>⚠</span>
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="form-group">
          <label htmlFor="address">
            כתובת מלאה <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <textarea
              id="address"
              value={customerDetails.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              onBlur={(e) => handleBlur('address', e.target.value)}
              className={getInputClasses('address', true)}
              placeholder="רחוב, מספר בית, עיר, מיקוד - לדוגמה: הרצל 15, תל אביב 6908512"
              rows="3"
              autoComplete="street-address"
              required
            />
            {touched.address && !errors.address && customerDetails.address?.trim() && (
              <div className="success-icon textarea-icon">
                <span>✓</span>
              </div>
            )}
          </div>
          {touched.address && errors.address && (
            <p className="error-message">
              <span>⚠</span>
              {errors.address}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">
            כתובת אימייל <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={customerDetails.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              className={getInputClasses('email')}
              placeholder="example@email.com"
              autoComplete="email"
              required
            />
            {touched.email && !errors.email && customerDetails.email?.trim() && (
              <div className="success-icon">
                <span>✓</span>
              </div>
            )}
          </div>
          {touched.email && errors.email && (
            <p className="error-message">
              <span>⚠</span>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Form Summary */}
      <div className="security-notice">
        <p className="main-text">🛡️ המידע שלך מוגן ומאובטח</p>
        <p className="sub-text">כל השדות המסומנים בכוכבית (*) הם חובה למילוי</p>
      </div>
    </div>
  );
};

export default CustomerDetailsForm;
