import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { submitOrderAsync } from '../../store/cartSlice';
import { isCustomerFormValid } from '../../utils/validation';
import OrderHeader from './Header/OrderHeader';
import CustomerDetailsForm from './CustomerDetails/CustomerDetailsForm';
import OrderItemsList from './OrderItems/OrderItemsList';
import OrderTotal from './OrderTotal/OrderTotal';
import './OrderSummaryScreen.scss';

const OrderSummaryScreen = ({ onBackToShopping, onOrderSuccess }) => {
  const { t } = useTranslation();
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    address: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    return isCustomerFormValid(customerDetails);
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      alert(t('orderSummary.fillAllFields'));
      return;
    }

    if (cartItems.length === 0) {
      alert(t('orderSummary.cartEmpty'));
      return;
    }

    setIsSubmitting(true);
    let orderSucceeded = false;

    try {
      const orderData = {
        customerDetails,
        items: cartItems,
        totalPrice: finalTotal,
        deliveryFee,
        orderDate: new Date().toISOString()
      };

      console.log('About to submit order:', orderData);
      const result = await dispatch(submitOrderAsync(orderData)).unwrap();
      console.log('Order submission result:', result);
      orderSucceeded = result && result.success;

      if (onOrderSuccess) {
        console.log('Order submitted successfully, calling onOrderSuccess');
        onOrderSuccess();
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      // In production, you would log this to a proper logging service
      // console.error('Order submission error:', error);

      // Show user-friendly error message
      const errorMessage = error?.message || t('orderSummary.orderError');
      alert(errorMessage);

    } finally {
      // Only reset loading state if order didn't succeed (to prevent flash)
      if (!orderSucceeded) {
        setIsSubmitting(false);
      }
    }
  };

  // Show loading screen while submitting order
  if (isSubmitting) {
    return (
      <div className="order-summary-screen rtl" dir="rtl" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        <p>{t('orderSummary.processingOrder')}</p>
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
