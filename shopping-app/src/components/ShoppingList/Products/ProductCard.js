import React, { useState } from 'react';
import { QuantityControl } from '../../Shared';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="product-card">
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="price">₪{product.price}</span>
          <span className="unit">/{product.unit}</span>
        </div>
      </div>
      
      <QuantityControl
        quantity={quantity}
        onQuantityChange={setQuantity}
        size="small"
        showInput={false}
        className="product-quantity-control"
      />

      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        הוסף {quantity > 1 ? `${quantity} ` : ''}לעגלה
      </button>
    </div>
  );
};

export default ProductCard;
