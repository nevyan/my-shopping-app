import React, { useState, useEffect, useCallback } from 'react';
import '../styles/PriceFilter.css';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  isOpen: boolean;
  onPriceChange: (min: number, max: number) => void;
  onToggle: () => void;
  currentRange: [number, number];
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  isOpen,
  onPriceChange,
  onToggle,
  currentRange
}) => {
  const [localMin, setLocalMin] = useState(currentRange[0]);
  const [localMax, setLocalMax] = useState(currentRange[1]);

  useEffect(() => {
    setLocalMin(currentRange[0]);
    setLocalMax(currentRange[1]);
  }, [currentRange]);

  const handleMinUpdate = (value: number) => {
    const newMin = Math.min(value, localMax - 1);
    setLocalMin(newMin);
    onPriceChange(newMin, localMax);
  };

  const handleMaxUpdate = (value: number) => {
    const newMax = Math.max(value, localMin + 1);
    setLocalMax(newMax);
    onPriceChange(localMin, newMax);
  };
  
  const getRangeStyle = useCallback(() => {
    const minPercent = ((localMin - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent = ((localMax - minPrice) / (maxPrice - minPrice)) * 100;
    return { left: `${minPercent}%`, width: `${maxPercent - minPercent}%` };
  }, [localMin, localMax, minPrice, maxPrice]);

  return (
    <div className="price-dropdown">
       <button 
        className={`filter-button ${isOpen || currentRange[0] !== minPrice || currentRange[1] !== maxPrice ? 'active' : ''}`}
        onClick={onToggle}
      >
        <span>
          Price {(currentRange[0] !== minPrice || currentRange[1] !== maxPrice) && 
            `($${currentRange[0]}-$${currentRange[1]})`}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className="price-dropdown-content">
          <div className="price-inputs">
            <div className="price-input-wrapper">
              <span className="dollar-sign">$</span>
              <input
                type="number"
                value={localMin}
                min={minPrice}
                max={maxPrice}
                onChange={(e) => handleMinUpdate(Number(e.target.value))}
              />
            </div>
            <span>—</span>
            <div className="price-input-wrapper">
              <span className="dollar-sign">$</span>
              <input
                type="number"
                value={localMax}
                min={minPrice}
                max={maxPrice}
                onChange={(e) => handleMaxUpdate(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="slider-container">
            <div className="slider-track" />
            <div className="slider-range" style={getRangeStyle()} />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={localMin}
              onChange={(e) => handleMinUpdate(Number(e.target.value))}
              className="thumb"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={localMax}
              onChange={(e) => handleMaxUpdate(Number(e.target.value))}
              className="thumb"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;