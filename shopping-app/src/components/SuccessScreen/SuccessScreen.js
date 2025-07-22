import React from 'react';
import './SuccessScreen.scss';

const SuccessScreen = ({ onNewOrder }) => {
  console.log('SuccessScreen component rendering');

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
          ההזמנה התקבלה בהצלחה!
        </h1>
        <p className="thank-you-text">
          תודה על ההזמנה שלך. נתחיל להכין אותה בהקדם.
        </p>
        <button 
          className="new-order-button"
          onClick={handleNewOrder}
        >
          התחל הזמנה חדשה
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
