import React from 'react';
import './QuantityControl.scss';

const QuantityControl = ({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  size = 'normal', // 'small', 'normal', 'large'
  showInput = true,
  className = ''
}) => {
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    onQuantityChange(Math.max(value, min));
  };

  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className={`quantity-control ${size} ${className}`}>
      <button 
        className="quantity-btn decrease"
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
        -
      </button>
      
      {showInput ? (
        <input 
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={handleInputChange}
          min={min}
        />
      ) : (
        <span className="quantity-display">{quantity}</span>
      )}
      
      <button 
        className="quantity-btn increase"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
