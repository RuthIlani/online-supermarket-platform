import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesAndProductsAsync } from './store/cartSlice';
import './App.css';
import { ShoppingListScreen, OrderSummaryScreen } from './components';

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

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Loading...</h1>
          <p>טוען מוצרים וקטגוריות...</p>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Error</h1>
          <p>שגיאה בטעינת המידע: {error}</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      {currentScreen === 'shopping' ? (
        <ShoppingListScreen onProceedToOrder={handleProceedToOrder} />
      ) : currentScreen === 'order' ? (
        <OrderSummaryScreen onBackToShopping={handleBackToShopping} />
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
