import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesAndProductsAsync } from './store/cartSlice';
import './App.css';
import { ShoppingListScreen, OrderSummaryScreen, SuccessScreen } from './components';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './i18n';
import { useTranslation } from 'react-i18next';

function AppRoutes() {
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCategoriesAndProductsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="App">      
          <p>{t('Loading data...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
          <h1>{t('Error')}</h1>
          <p>{t('Data loading error:')} {error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <ShoppingListScreen onProceedToOrder={() => navigate('/order')} />
        } />
        <Route path="/order" element={
          <OrderSummaryScreen 
            onBackToShopping={() => navigate('/')}
            onOrderSuccess={() => navigate('/success')}
          />
        } />
        <Route path="/success" element={
          <SuccessScreen onNewOrder={() => navigate('/')} />
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
