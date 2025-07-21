import React from 'react';

const OrderHeader = ({ onBackToShopping }) => {
  return (
    <header className="order-header" dir="rtl">
      <div className="order-header-content">
        <button className="back-btn" onClick={onBackToShopping}>
          ← חזרה לקנייה
        </button>
        <h1>סיכום ההזמנה</h1>
      </div>
    </header>
  );
};

export default OrderHeader;
