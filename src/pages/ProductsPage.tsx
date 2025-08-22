import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import '../styles/ProductsPage.css';
import FilterButtons from '../components/FilterButtons';
import BrandFilter from '../components/BrandFilter';
import SortOptions from '../components/SortOptions';
import PriceFilter from '../components/PriceFilter';
import ProductOptionModal from '../components/ProductOptionModal';
import Pagination from '../components/Pagination';
import toast, { Toaster } from 'react-hot-toast';
import type { Product, Brand, Category } from '../types';
import { useCart } from '../context/CartContext';

import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ProductsPage: React.FC = () => {

  const { cartItems, addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | ''>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); 

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsData, brandsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getBrands(),
          api.getCategories(),
        ]);
        setProducts(productsData);
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    function handleGlobalMouseDown(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBrandDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleGlobalMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleGlobalMouseDown);
    };
  }, []); 

  useEffect(() => {

    if (products.length > 0) {
      const prices = products.map(p => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [products]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleBrandCheckboxChange = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
    setCurrentPage(1); 
  };

  const handleAddToCart = (product: Product, selectedOption?: number | string) => {
    addToCart(product, 1, selectedOption || null);
  const optionText = selectedOption
    ? ` - ${product.selectible_option?.option_name}: ${selectedOption}`
    : '';
        toast.success(`${product.product_name}${optionText} added to cart!`);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setCurrentPage(1); 
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = filter === 'All' ? true : product.category === filter;
    const brandMatch = selectedBrands.length === 0 ? true : selectedBrands.includes(product.brand);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && brandMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-container">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

<Header/>
      <main>
        <h2 className="products-title">Products</h2>
        <div className="filter-sort-container">
          <div className="filter-group">
            <FilterButtons
              categories={categories}
              activeFilter={filter}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="sort-controls">
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              isOpen={isPriceOpen}
              onToggle={() => setIsPriceOpen(!isPriceOpen)}
              onPriceChange={handlePriceChange}
              currentRange={priceRange}
            />
            <BrandFilter
              ref={dropdownRef}
              brands={brands}
              selectedBrands={selectedBrands}
              isOpen={showBrandDropdown}
              onToggle={() => setShowBrandDropdown(!showBrandDropdown)}
              onBrandSelect={handleBrandCheckboxChange}
            />

            <SortOptions
              activeSort={sortBy}
              onSortChange={setSortBy} 
            />

          </div>
        </div>
        <div className="product-grid">

          {
            currentProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                                   <Link to={`/product/${product.id}`} className="product-card-link">
                  <img src={product.image} alt={product.product_name} className="product-image" />
                 </Link>
                  <button
                    className="add-to-cart-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      if (product.selectible_option) {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      } else {
                        handleAddToCart(product);
                      }
                    }}
                    aria-label="Add to cart"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.product_name}</h3>
                  <p className="product-brand">{product.brand}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </main>
      {selectedProduct && (
        <ProductOptionModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductsPage;