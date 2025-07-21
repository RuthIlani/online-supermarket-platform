import React from 'react';

const OrderTotal = ({ subtotal, deliveryFee, total, onSubmitOrder, isSubmitting, isFormValid, customerDetails }) => {
  const getValidationMessage = () => {
    if (!customerDetails) return 'אנא מלא את כל השדות הנדרשים';
    
    const issues = [];
    
    if (!customerDetails.fullName?.trim() || customerDetails.fullName.trim().length < 2) {
      issues.push('שם מלא (לפחות 2 תווים)');
    } else if (!/^[א-תa-zA-Z\s]+$/.test(customerDetails.fullName.trim())) {
      issues.push('שם מלא (רק אותיות ורווחים)');
    }
    
    if (!customerDetails.email?.trim()) {
      issues.push('כתובת אימייל');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      issues.push('כתובת אימייל תקינה');
    }
    
    if (!customerDetails.address?.trim()) {
      issues.push('כתובת');
    } else if (customerDetails.address.trim().length < 10) {
      issues.push('כתובת מלאה (לפחות 10 תווים)');
    }
    
    if (issues.length === 0) return '';
    
    return `נדרש: ${issues.join(', ')}`;
  };
  return (
    <div className="order-total" dir="rtl">
      <h3>סיכום תשלום</h3>
      
      <div className="total-breakdown">
        <div className="total-line">
          <span>סה"כ מוצרים:</span>
          <span>₪{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="total-line">
          <span>עלות משלוח:</span>
          <span>₪{deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="total-line delivery-info">
          <small>משלוח חינם מעל ₪100</small>
        </div>
        
        <hr />
        
        <div className="total-line final-total">
          <strong>
            <span>סה"כ לתשלום:</span>
            <span>₪{total.toFixed(2)}</span>
          </strong>
        </div>
      </div>
      
      <div className="payment-info">
        <h4>אמצעי תשלום</h4>
        <p>התשלום יבוצע במזומן בעת הקבלה</p>
      </div>
      
      <div className="delivery-info">
        <h4>זמן משלוח</h4>
        <p>ההזמנה תגיע תוך 24-48 שעות</p>
      </div>
      
      <button
        className={`submit-order-btn ${!isFormValid || isSubmitting ? 'disabled' : ''}`}
        onClick={onSubmitOrder}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? 'שולח הזמנה...' : 'שלח הזמנה'}
      </button>
      
      {!isFormValid && (
        <p className="form-validation-message">
          {getValidationMessage()}
        </p>
      )}
    </div>
  );
};

export default OrderTotal;
