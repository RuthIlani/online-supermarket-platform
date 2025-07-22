import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderHeader = ({ onBackToShopping }) => {
  const { t } = useTranslation();

  return (
    <header className="order-header" dir="rtl">
      <div className="order-header-content">
        <button className="back-btn" onClick={onBackToShopping}>
          ← {t('orderHeader.backToShopping')}
        </button>
        <h1>{t('orderHeader.orderSummary')}</h1>
      </div>
    </header>
  );
};

export default OrderHeader;
