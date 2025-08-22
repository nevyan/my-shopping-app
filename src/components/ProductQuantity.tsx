
import React, { useState } from 'react';

import '../styles/ProductQuantity.css';


interface ProductQuantityProps {
  availableQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({ availableQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < availableQuantity) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + 1;
        onQuantityChange(newQuantity);
        return newQuantity;
      });
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity - 1;
        onQuantityChange(newQuantity);
        return newQuantity;
      });
    }
  };

  return (
    <div className="product-quantity">
      <button onClick={decrement} disabled={quantity === 1}>-</button>
      <span>{quantity}</span>
      <button onClick={increment} disabled={quantity >= availableQuantity}>+</button>
    </div>
  );
};

export default ProductQuantity;