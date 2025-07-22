import React from 'react';
import { useTranslation } from 'react-i18next';

const CartFooter = ({ totalPrice, onCheckout }) => {
  const { t } = useTranslation();

  return (
    <div className="cart-footer">
      <div className="total-section">
        <div className="total-price">
          <strong>{t('cart.totalToPay')}: ₪{totalPrice.toFixed(2)}</strong>
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          {t('cart.continueToOrder')}
        </button>
      </div>
    </div>
  );
};

export default CartFooter;
