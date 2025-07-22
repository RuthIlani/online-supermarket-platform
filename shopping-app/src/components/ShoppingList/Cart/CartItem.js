import React from 'react';
import { useTranslation } from 'react-i18next';
import { QuantityControl } from '../../Shared';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { t } = useTranslation();

  return (
    <div className="cart-item">
      <div className="item-info">
        <h4>{item.name}</h4>
        <span className="item-price">₪{item.price} / {item.unit}</span>
      </div>
      <QuantityControl
        quantity={item.quantity}
        onQuantityChange={(newQuantity) => onQuantityChange(item.id, newQuantity)}
        size="small"
        showInput={false}
        className="cart-quantity-control"
      />
      <div className="item-total">
        ₪{(item.price * item.quantity).toFixed(2)}
      </div>
      <button 
        onClick={() => onRemove(item.id)}
        className="remove-btn"
      >
        {t('cart.remove')}
      </button>
    </div>
  );
};

export default CartItem;
