import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderTotal = ({ subtotal, deliveryFee, total, onSubmitOrder, isSubmitting, isFormValid, customerDetails }) => {
  const { t } = useTranslation();
  
  const getValidationMessage = () => {
    if (!customerDetails) return t('orderTotal.fillAllFields');
    const issues = [];
    if (!customerDetails.fullName?.trim() || customerDetails.fullName.trim().length < 2) {
      issues.push(t('orderTotal.fullNameMin'));
    } else if (!/^[a-zA-Z\s]+$/.test(customerDetails.fullName.trim())) {
      issues.push(t('orderTotal.fullNameLetters'));
    }
    if (!customerDetails.email?.trim()) {
      issues.push(t('orderTotal.emailRequired'));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      issues.push(t('orderTotal.emailValid'));
    }
    if (!customerDetails.address?.trim()) {
      issues.push(t('orderTotal.addressRequired'));
    } else if (customerDetails.address.trim().length < 10) {
      issues.push(t('orderTotal.addressMin'));
    }
    if (issues.length === 0) return '';
    return t('orderTotal.required') + ': ' + issues.join(', ');
  };

  return (
    <div className="order-total" dir="rtl">
      <h3>{t('orderTotal.paymentSummary')}</h3>
      <div className="total-breakdown">
        <div className="total-line">
          <span>{t('orderTotal.productsTotal')}:</span>
          <span>₪{subtotal.toFixed(2)}</span>
        </div>
        <div className="total-line">
          <span>{t('orderTotal.deliveryFee')}:</span>
          <span>₪{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="total-line delivery-info">
          <small>{t('orderTotal.freeDeliveryInfo')}</small>
        </div>
        <hr />
        <div className="total-line final-total">
          <strong>
            <span>{t('orderTotal.totalToPay')}:</span>
            <span>₪{total.toFixed(2)}</span>
          </strong>
        </div>
      </div>
      <div className="payment-info">
        <h4>{t('orderTotal.paymentMethods')}</h4>
        <p>{t('orderTotal.cashOnDelivery')}</p>
      </div>
      <div className="delivery-info">
        <h4>{t('orderTotal.deliveryTime')}</h4>
        <p>{t('orderTotal.deliveryEta')}</p>
      </div>
      <button
        className={`submit-order-btn ${!isFormValid || isSubmitting ? 'disabled' : ''}`}
        onClick={onSubmitOrder}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? t('orderTotal.sendingOrder') : t('orderTotal.sendOrder')}
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
