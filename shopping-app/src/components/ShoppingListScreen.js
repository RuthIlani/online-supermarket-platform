import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ShoppingHeader from './ShoppingHeader';
import ProductsSection from './ProductsSection';
import { CartColumn } from './ShoppingList/Cart';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import './ShoppingListScreen.scss';

const ShoppingListScreen = () => {
  const { cartItems, categories, products, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  // Local state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      unit: product.unit
    }));
    setQuantity(1); // Reset quantity after adding
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Calculate total price of all items in cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  const totalPrice = getTotalPrice();

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
        <CartColumn 
          cartItems={cartItems}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default ShoppingListScreen;
