import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ShoppingHeader } from './Header';
import { ProductsSection } from './Products';
import { CartSection } from './Cart';
import { LoadingState, ErrorState } from './States';
import './ShoppingListScreen.scss';

const ShoppingListScreen = ({ onProceedToOrder }) => {
  const { cartItems, categories, products, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  // Local state
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle adding product to cart
  const handleAddToCart = (product, quantity = 1) => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="shopping-list-screen rtl">
      <ShoppingHeader cartItems={cartItems} totalPrice={totalPrice} />

      <div className="shopping-grid">
        {/* Right Column - Categories & Products */}
        <ProductsSection 
          categories={categories}
          products={products}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onAddToCart={handleAddToCart}
        />

        {/* Left Column - Shopping Cart */}
        <CartSection 
          cartItems={cartItems}
          totalPrice={totalPrice}
          onProceedToOrder={onProceedToOrder}
        />
      </div>
    </div>
  );
};

export default ShoppingListScreen;
