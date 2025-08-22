import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Header.css'; 
import shoppingBagIcon from '../assets/shopping.svg'; 


const Header: React.FC = () => {
  const { cartItems, toggleCart } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
       <header className="page-header">
        <h1 className="logo">Flat Rock Tech</h1>
        <div className="cart-icon" onClick={toggleCart}>
           <img 
            src={shoppingBagIcon} 
            alt="Shopping Cart" 
            className="cart-bag-img" 
          />

        {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </div>
      </header>
  );
};

export default Header;