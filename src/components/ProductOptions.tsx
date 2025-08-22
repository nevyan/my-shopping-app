
import React from 'react';

import '../styles/ProductOptions.css';


interface Option {
  option_type: string;
  option_name: string;
  option: (number | string)[];
}

interface ProductOptionsProps {
  options: Option[];
  selectedOptions: { [key: string]: number | string };
  onOptionSelect: (optionType: string, value: number | string) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ options, selectedOptions, onOptionSelect }) => {
  return (
    <div className="product-options">
      {options.map((option) => (
        <div key={option.option_type} className="option-group">
          <label className="option-label">{option.option_name}</label>
          <select
            value={selectedOptions[option.option_type] || ''}
            onChange={(e) => onOptionSelect(option.option_type, e.target.value)}
          >
            <option value="" disabled>Select {option.option_name}</option>
            {option.option.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;