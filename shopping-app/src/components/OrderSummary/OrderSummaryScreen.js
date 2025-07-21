import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitOrderAsync } from '../../store/cartSlice';
import OrderHeader from './Header/OrderHeader';
import CustomerDetailsForm from './CustomerDetails/CustomerDetailsForm';
import OrderItemsList from './OrderItems/OrderItemsList';
import OrderTotal from './OrderTotal/OrderTotal';
import './OrderSummaryScreen.scss';

const OrderSummaryScreen = ({ onBackToShopping }) => {
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    address: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 15; // Fixed delivery fee
  const finalTotal = totalPrice + deliveryFee;

  const handleCustomerDetailsChange = (field, value) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const fullNameValid = customerDetails.fullName?.trim() && 
                          customerDetails.fullName.trim().length >= 2 &&
                          /^[א-תa-zA-Z\s]+$/.test(customerDetails.fullName.trim());
    
    const emailValid = customerDetails.email?.trim() && 
                       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email);
    
    const addressValid = customerDetails.address?.trim() && 
                         customerDetails.address.trim().length >= 10;

    console.log('Form validation debug:', {
      fullName: customerDetails.fullName,
      fullNameValid,
      email: customerDetails.email,
      emailValid,
      address: customerDetails.address,
      addressValid,
      addressLength: customerDetails.address?.trim().length
    });
    
    return fullNameValid && emailValid && addressValid;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }

    if (cartItems.length === 0) {
      alert('העגלה ריקה');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customerDetails,
        items: cartItems,
        totalPrice: finalTotal,
        deliveryFee,
        orderDate: new Date().toISOString()
      };

      await dispatch(submitOrderAsync(orderData)).unwrap();
      setOrderSubmitted(true);
    } catch (error) {
      alert('שגיאה בשליחת ההזמנה. אנא נסה שוב.');
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="order-summary-screen rtl" dir="rtl">
        <div className="order-success">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h1>ההזמנה נשלחה בהצלחה!</h1>
            <p>תודה על ההזמנה. נחזור אליך בהקדם.</p>
            <button 
              className="new-order-btn"
              onClick={() => {
                setOrderSubmitted(false);
                onBackToShopping();
              }}
            >
              הזמנה חדשה
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-screen rtl" dir="rtl">
      <OrderHeader onBackToShopping={onBackToShopping} />
      
      <div className="order-content">
        <div className="order-main">
          <CustomerDetailsForm 
            customerDetails={customerDetails}
            onChange={handleCustomerDetailsChange}
          />
          
          <OrderItemsList items={cartItems} />
        </div>
        
        <div className="order-sidebar">
          <OrderTotal 
            subtotal={totalPrice}
            deliveryFee={deliveryFee}
            total={finalTotal}
            onSubmitOrder={handleSubmitOrder}
            isSubmitting={isSubmitting}
            isFormValid={validateForm()}
            customerDetails={customerDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryScreen;
