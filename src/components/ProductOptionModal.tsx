import React from 'react';
import '../styles/ProductOptionModal.css';
import type { Product } from '../types'; 





interface ProductOptionModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedOption: number | string) => void;
}

const ProductOptionModal: React.FC<ProductOptionModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select {product.selectible_option.option_name}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="product-preview">
            <img src={product.image} alt={product.product_name} />
            <div className="product-info">
              <h4>{product.product_name}</h4>
              <p>{product.brand}</p>
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="options-grid">
            {product.selectible_option.option.map((option) => (
              <button
                key={option}
                className="option-button"
                onClick={() => {
                  onAddToCart(product, option);
                  onClose();
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOptionModal;