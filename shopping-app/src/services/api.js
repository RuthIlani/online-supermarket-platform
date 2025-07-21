// Mock API service for the shopping app
const api = {
  fetchCategoriesAndProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          categories: [
            { id: 1, name: 'פירות וירקות', nameEn: 'Fruits & Vegetables' },
            { id: 2, name: 'חלב וביצים', nameEn: 'Dairy & Eggs' },
            { id: 3, name: 'בשר ודגים', nameEn: 'Meat & Fish' },
            { id: 4, name: 'לחם ומאפים', nameEn: 'Bread & Bakery' },
          ],
          products: [
            // פירות וירקות
            {
              id: 1,
              name: 'תפוחים',
              nameEn: 'Apples',
              price: 8.90,
              categoryId: 1,
              unit: 'ק"ג',
              description: 'תפוחים אדומים טריים ומתוקים'
            },
            {
              id: 2,
              name: 'בננות',
              nameEn: 'Bananas',
              price: 6.50,
              categoryId: 1,
              unit: 'ק"ג',
              description: 'בננות צהובות בשלות'
            },
            {
              id: 3,
              name: 'גזר',
              nameEn: 'Carrots',
              price: 4.90,
              categoryId: 1,
              unit: 'ק"ג',
              description: 'גזר תינוק טרי ומתוק'
            },
            // חלב וביצים
            {
              id: 4,
              name: 'חלב 3%',
              nameEn: 'Milk 3%',
              price: 5.90,
              categoryId: 2,
              unit: 'ליטר',
              description: 'חלב טרי בד 3% שומן'
            },
            {
              id: 5,
              name: 'ביצים',
              nameEn: 'Eggs',
              price: 12.90,
              categoryId: 2,
              unit: '12 יח׳',
              description: 'ביצים טריות מחווה'
            },
            {
              id: 6,
              name: 'גבינה צהובה',
              nameEn: 'Yellow Cheese',
              price: 18.90,
              categoryId: 2,
              unit: '200 גרם',
              description: 'גבינה צהובה קשה איכותית'
            },
            // בשר ודגים
            {
              id: 7,
              name: 'עוף טרי',
              nameEn: 'Fresh Chicken',
              price: 24.90,
              categoryId: 3,
              unit: 'ק"ג',
              description: 'עוף טרי איכותי'
            },
            {
              id: 8,
              name: 'בקר טחון',
              nameEn: 'Ground Beef',
              price: 42.90,
              categoryId: 3,
              unit: 'ק"ג',
              description: 'בשר בקר טחון רזה 5%'
            },
            {
              id: 9,
              name: 'סלמון',
              nameEn: 'Salmon',
              price: 89.90,
              categoryId: 3,
              unit: 'ק"ג',
              description: 'פילה סלמון טרי ללא עצמות'
            },
            // לחם ומאפים
            {
              id: 10,
              name: 'לחם שחור',
              nameEn: 'Brown Bread',
              price: 8.50,
              categoryId: 4,
              unit: 'יח׳',
              description: 'לחם שחור מקמח מלא'
            },
            {
              id: 11,
              name: 'חלות',
              nameEn: 'Challah',
              price: 12.90,
              categoryId: 4,
              unit: 'יח׳',
              description: 'חלות שבת טריות וריחניות'
            },
            {
              id: 12,
              name: 'רוגעלך',
              nameEn: 'Rugelach',
              price: 15.90,
              categoryId: 4,
              unit: '6 יח׳',
              description: 'רוגעלך במילוי שוקולד וקינמון'
            },
          ]
        };
        
        resolve(mockData);
      }, 1000);
    });
  },

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
