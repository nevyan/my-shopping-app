import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import '../styles/ProductDetailPage.css';
import Header from '../components/Header';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { cartItems, addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const productData = await api.getProductById(productId);
        setProduct(productData);
        if (productData.selectible_option?.option?.[0]) {
          setSelectedOption(productData.selectible_option.option[0]);
        }
      } catch (err) {
        setError('Failed to load product. It might not exist.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const quantityInCart = cartItems.find(
    (item) => item.id === product?.id && item.selectedOption === selectedOption
  )?.quantity ?? 0;

  const availableStock = product?.stock_quantity !== undefined
    ? product.stock_quantity - quantityInCart
    : undefined;

  const isOutOfStock = availableStock !== undefined && availableStock <= 0;

  const handleAddToCart = () => {
    if (product && !isOutOfStock) {
      addToCart(product, 1, selectedOption);
    }
  };

  if (isLoading) return <div className="detail-loading">Loading...</div>;
  if (error) return <div className="detail-error">{error} <Link to="/">Go back</Link></div>;
  if (!product) return <div className="detail-error">Product not found. <Link to="/">Go back</Link></div>;

  return (
    <div className="page-container">
      <Header />

      <main className="product-detail-content">
        <div className="detail-image-column">
          <img src={product.image} alt={product.product_name} className="detail-product-image" />
        </div>

        <div className="detail-info-column">
          <h1 className="detail-product-name">{product.product_name}</h1>
          <p className="detail-brand">{product.brand}</p>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description || 'No description available.'}</p>

          {product.selectible_option && (
            <div className="detail-options-container">
              <label htmlFor="product-option" className="detail-option-label">
                {product.selectible_option.option_name}
              </label>
              <select
                id="product-option"
                className="detail-option-select"
                value={selectedOption ?? ''}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {product.selectible_option.option.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          <button onClick={handleAddToCart} className="detail-add-to-cart-btn" disabled={isOutOfStock}>
            {isOutOfStock ? 'Out of Stock' : 'Add to cart'}
          </button>

          <div className="detail-stock-info">
            {availableStock !== undefined && !isOutOfStock && (
              <p >Available Quantity:<span className="detail-available-qty"> {availableStock}</span></p>
            )}
            {isOutOfStock && (
              <p className="detail-out-of-stock">Out of stock</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;