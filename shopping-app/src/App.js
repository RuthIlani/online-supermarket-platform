import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesAndProductsAsync } from './store/cartSlice';
import './App.css';
import { ShoppingListScreen, OrderSummaryScreen, SuccessScreen } from './components';

function App() {
  const [currentScreen, setCurrentScreen] = useState('shopping');
  const cartItems = useSelector((state) => state.cart.cartItems);
  const categories = useSelector((state) => state.cart.categories);
  const products = useSelector((state) => state.cart.products);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAndProductsAsync());
  }, [dispatch]);

  // Handle proceeding to order screen
  const handleProceedToOrder = () => {
    setCurrentScreen('order');
  };

  // Handle going back to shopping
  const handleBackToShopping = () => {
    setCurrentScreen('shopping');
  };

  // Handle successful order submission
  const handleOrderSuccess = () => {
    setCurrentScreen('success');
  };

  // Handle starting a new order from success screen
  const handleStartNewOrder = () => {
    // Reset to shopping screen
    setCurrentScreen('shopping');
    // Optionally dispatch reset actions
    dispatch({ type: 'cart/clearCart' });
    dispatch({ type: 'CLEAR_ORDER_SUCCESS' });
  };

  if (loading) {
    return (
      <div className="App">      
          <p>טוען נתונים...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
          <h1>Error</h1>
          <p>שגיאה בטעינת המידע: {error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      {currentScreen === 'shopping' ? (
        <ShoppingListScreen onProceedToOrder={handleProceedToOrder} />
      ) : currentScreen === 'order' ? (
        <OrderSummaryScreen 
          onBackToShopping={handleBackToShopping} 
          onOrderSuccess={handleOrderSuccess}
        />
      ) : currentScreen === 'success' ? (
        <SuccessScreen onNewOrder={handleStartNewOrder} />
      ) : (
        <header className="App-header">
          <h1>Hello Online Supermarket!</h1>         
          <button onClick={() => setCurrentScreen('shopping')}>
            Start Shopping
          </button>
        </header>
      )}
    </div>
  );
}

export default App;
