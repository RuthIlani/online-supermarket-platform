import React from 'react';
import { useTranslation } from 'react-i18next';

const EmptyCart = () => {
  const { t } = useTranslation();

  return (
    <div className="empty-cart">
      <p>{t('cart.cartEmpty')}</p>
      <span>{t('cart.selectProductsToStart')}</span>
    </div>
  );
};

export default EmptyCart;
