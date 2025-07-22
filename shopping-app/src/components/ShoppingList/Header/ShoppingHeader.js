import React from 'react';
import { useTranslation } from 'react-i18next';

const ShoppingHeader = ({ cartItems, totalPrice }) => {
  const { t } = useTranslation();

  return (
    <header className="shopping-header">
      <h1>{t('shopping.shoppingList')}</h1>
      <div className="cart-summary">
        <span>{t('shopping.totalItems')}: {cartItems.length}</span>
        <span>{t('shopping.totalPrice')}: ₪{totalPrice.toFixed(2)}</span>
      </div>
    </header>
  );
};

export default ShoppingHeader;
