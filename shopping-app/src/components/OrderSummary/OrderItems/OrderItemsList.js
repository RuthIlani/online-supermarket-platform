import React from 'react';

const OrderItemsList = ({ items }) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="order-items-list" dir="rtl">
      <h2>פריטים בהזמנה ({items.length})</h2>
      
      <div className="items-container">
        {items.length === 0 ? (
          <div className="empty-order">
            <p>אין פריטים בהזמנה</p>
          </div>
        ) : (
          <>
            <div className="items-header">
              <span>מוצר</span>
              <span>כמות</span>
              <span>מחיר יחידה</span>
              <span>סה"כ</span>
            </div>
            
            <div className="items-list">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <span className="item-unit">{item.unit}</span>
                  </div>
                  
                  <div className="item-quantity">
                    {item.quantity}
                  </div>
                  
                  <div className="item-price">
                    ₪{item.price.toFixed(2)}
                  </div>
                  
                  <div className="item-total">
                    ₪{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="items-subtotal">
              <strong>סה"כ מוצרים: ₪{subtotal.toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderItemsList;
