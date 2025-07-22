// Mock API service for the shopping app
const api = {
  submitOrder: (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order submitted:', orderData);
        
        const response = {
          success: true,
          orderId: Math.floor(Math.random() * 1000000) + 100000, // Random 6-digit order ID
          message: 'הזמנה נשלחה בהצלחה!',
          messageEn: 'Order submitted successfully!',
          estimatedDelivery: '2-3 ימי עסקים',
          timestamp: new Date().toISOString()
        };
        
        resolve(response);
      }, 1500);
    });
  }
};

export default api;
