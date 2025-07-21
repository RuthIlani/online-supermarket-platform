import React from 'react';
import { QuantityControl } from '../../Shared';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
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
        הסר
      </button>
    </div>
  );
};

export default CartItem;
