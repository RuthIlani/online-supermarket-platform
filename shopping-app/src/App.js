import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Online Supermarket with Redux!</h1>
        <p>Welcome to your online supermarket platform</p>
        <p>Cart Items: {cartItems.length}</p>
        <p>Current Screen: {currentScreen}</p>
      </header>
    </div>
  );
}

export default App;
