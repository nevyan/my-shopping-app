import React from 'react';

interface Brand {
  id: number;
  name: string;
}

interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: string[];
  isOpen: boolean;
  onToggle: () => void;
  onBrandSelect: (brandName: string) => void;
}

const BrandFilter = React.forwardRef<HTMLDivElement, BrandFilterProps>(
  ({ brands, selectedBrands, isOpen, onToggle, onBrandSelect }, ref) => {
    return (
      <div className="brand-dropdown" ref={ref}>
        <button
          className={`filter-button ${isOpen || selectedBrands.length > 0 ? 'active' : ''}`}
          onClick={onToggle}
        >
          <span>
            Brand {selectedBrands.length > 0 && `(${selectedBrands.length})`}
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className={`dropdown-content ${isOpen ? 'show' : ''}`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {brands.map(brand => (
            <div key={brand.id} className="brand-checkbox-item">
              <input
                type="checkbox"
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.name)}
                onChange={() => onBrandSelect(brand.name)}
              />
              <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default BrandFilter;