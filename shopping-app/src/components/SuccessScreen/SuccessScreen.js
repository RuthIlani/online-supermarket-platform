
import React from 'react';
import { useTranslation } from 'react-i18next';
import './SuccessScreen.scss';


const SuccessScreen = ({ onNewOrder }) => {
  const { t } = useTranslation();

  const handleNewOrder = () => {
    if (onNewOrder) {
      onNewOrder();
    }
  };

  return (
    <div className="success-screen">
      <div className="success-content">
        <div className="success-icon">
          ✓
        </div>
        <h1 className="success-message">
          {t('orderSuccess.title')}
        </h1>
        <p className="thank-you-text">
          {t('orderSuccess.thankYou')}
        </p>
        <button 
          className="new-order-button"
          onClick={handleNewOrder}
        >
          {t('orderSuccess.newOrderBtn')}
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
