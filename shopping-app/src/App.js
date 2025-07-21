import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesAndProductsAsync } from './store/cartSlice';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const cartItems = useSelector((state) => state.cart.cartItems);
  const categories = useSelector((state) => state.cart.categories);
  const products = useSelector((state) => state.cart.products);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAndProductsAsync());
  }, [dispatch]);

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
      <header className="App-header">
        <h1>Hello Online Supermarket with Redux!</h1>
        <p>Welcome to your online supermarket platform</p>
        <p>Cart Items: {cartItems.length}</p>
        <p>Categories: {categories.length}</p>
        <p>Products: {products.length}</p>
        <p>Current Screen: {currentScreen}</p>
      </header>
    </div>
  );
}

export default App;
