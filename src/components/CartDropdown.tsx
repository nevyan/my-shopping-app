import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartDropdown.css';

const CartDropdown: React.FC = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!isCartOpen) return null;

  return (
    <div className="cart-dropdown" onClick={(e) => e.stopPropagation()}>
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button className="close-button" onClick={closeCart}>×</button>
      </div>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={`${item.id}-${item.selectedOption}`} className="cart-item">
            <img src={item.image} alt={item.product_name} className="item-image" />
            <div className="item-details">
              <div className="item-brand">{item.brand}</div>
              <div className="item-name">{item.product_name}</div>

              {item.selectedOption && item.selectible_option && (
                <div className="item-option">
                  <span className="item-option-name">{item.selectible_option.option_name}:</span>
                  {' '}
                  {item.selectedOption}
                </div>
              )}

              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.selectedOption, item.quantity - 1)}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.selectedOption, item.quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
            </div>
            <div className="price-and-remove">
              <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
              <button
                onClick={() => removeFromCart(item.id, item.selectedOption)}
                className="remove-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <div className="cart-footer">
          <div className="total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button className="checkout-button">Continue To Checkout</button>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;