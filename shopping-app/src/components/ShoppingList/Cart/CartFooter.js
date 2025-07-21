import React from 'react';

const CartFooter = ({ totalPrice, onCheckout }) => {
  return (
    <div className="cart-footer">
      <div className="total-section">
        <div className="total-price">
          <strong>סה"כ לתשלום: ₪{totalPrice.toFixed(2)}</strong>
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          המשך להזמנה
        </button>
      </div>
    </div>
  );
};

export default CartFooter;
