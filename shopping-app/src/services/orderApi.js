// Order API service for the shopping app
const orderApi = {
  submitOrder: async (orderData) => {
    try {
      console.log('Original order data from frontend:', orderData);
      
      // Transform frontend data to server expected format
      const serverOrderData = {
        customer: {
          name: orderData.customerDetails?.name || orderData.customerDetails?.fullName || '',
          email: orderData.customerDetails?.email || '',
          address: orderData.customerDetails?.address || ''
        },
        products: orderData.items?.map(item => ({
          productId: item.id || item.productId || `P${Math.floor(Math.random() * 1000)}`,
          productName: item.name || item.productName || 'Unknown Product',
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          quantity: item.quantity,
          unitPrice: parseFloat(item.price || item.unitPrice || 0)
        })) || []
      };
      
      console.log('Submitting transformed order to server:', serverOrderData);
      
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverOrderData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Transform server response to match expected format
      return {
        success: result.success || true,
        orderId: result.data?.orderId || result.orderId,
        message: result.message || 'הזמנה נשלחה בהצלחה!',
        messageEn: result.messageEn || 'Order submitted successfully!',
        estimatedDelivery: '2-3 ימי עסקים',
        timestamp: new Date().toISOString(),
        serverData: result
      };
      
    } catch (error) {
      console.error('Error submitting order:', error);
      
      // Return error response in expected format
      return {
        success: false,
        message: 'שגיאה בשליחת ההזמנה',
        messageEn: 'Error submitting order',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
};

export default orderApi;
