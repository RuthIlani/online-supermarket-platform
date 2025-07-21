import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../../store/cartSlice';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import CartFooter from './CartFooter';
import './CartSection.scss';

const CartSection = ({ cartItems, totalPrice }) => {
  const dispatch = useDispatch();

  // Handle updating item quantity in cart
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Handle continue to order
  const handleContinueToOrder = () => {
    if (cartItems.length === 0) {
      alert('העגלה ריקה! אנא הוסף מוצרים לפני המשך להזמנה.');
      return;
    }
    // TODO: Navigate to order/checkout screen
    console.log('Continuing to order with items:', cartItems);
    alert(`ממשיך להזמנה עם ${cartItems.length} פריטים. סך הכל: ₪${totalPrice.toFixed(2)}`);
  };

  return (
    <div className="cart-section">
      <div className="cart-header">
        <h2>🛒 עגלת קניות</h2>
        <span className="cart-count">{cartItems.length} פריטים</span>
      </div>
      
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveFromCart}
              />
            ))}
          </div>
          
          <CartFooter 
            totalPrice={totalPrice}
            onCheckout={handleContinueToOrder}
          />
        </>
      )}
    </div>
  );
};

export default CartSection;
