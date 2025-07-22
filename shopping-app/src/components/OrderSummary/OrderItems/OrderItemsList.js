import React from 'react';
import { useTranslation } from 'react-i18next';

const OrderItemsList = ({ items }) => {
  const { t } = useTranslation();
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="order-items-list" dir="rtl">
      <h2>{t('orderItems.itemsInOrder')} ({items.length})</h2>
      
      <div className="items-container">
        {items.length === 0 ? (
          <div className="empty-order">
            <p>{t('orderItems.noItems')}</p>
          </div>
        ) : (
          <>
            <div className="items-header">
              <span>{t('orderItems.product')}</span>
              <span>{t('orderItems.quantity')}</span>
              <span>{t('orderItems.unitPrice')}</span>
              <span>{t('orderItems.total')}</span>
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
              <strong>{t('orderItems.productsTotal')}: ₪{subtotal.toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderItemsList;
