import React from 'react';

const ShoppingHeader = ({ cartItems, totalPrice }) => {
  return (
    <header className="shopping-header">
      <h1>רשימת קניות</h1>
      <div className="cart-summary">
        <span>סה"כ פריטים: {cartItems.length}</span>
        <span>סה"כ מחיר: ₪{totalPrice.toFixed(2)}</span>
      </div>
    </header>
  );
};

export default ShoppingHeader;
