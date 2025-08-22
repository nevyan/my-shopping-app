import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product, CartItem } from '../types';


interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantity: number, selectedOption: number | string | null) => void;
  removeFromCart: (productId: string, selectedOption: number | string | null) => void;
  updateQuantity: (productId: string, selectedOption: number | string | null, newQuantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, quantity: number, selectedOption: number | string | null) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedOption === selectedOption
      );
      if (existingItem) {
        // If item exists, map over the array and update the quantity of the matching item
        return prevItems.map(item =>
          item.id === product.id && item.selectedOption === selectedOption
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, selectedOption }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedOption: number | string | null) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.selectedOption === selectedOption))
    );
  };

  const updateQuantity = (productId: string, selectedOption: number | string | null, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedOption);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId && item.selectedOption === selectedOption
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // The value that will be supplied to all consumers of this context
  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};