import React, { useState, useEffect, useRef } from 'react';
import '../styles/SortOptions.css';

interface SortOption {
  value: string;
  label: string;
}

interface SortOptionsProps {
  activeSort: string; 
  onSortChange: (value: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ activeSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: SortOption[] = [
    { value: 'date-desc', label: 'Release Date: Desc' },
    { value: 'date-asc', label: 'Release Date: Asc' },
    { value: 'price-desc', label: 'Price: Desc' },
    { value: 'price-asc', label: 'Price: Asc' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (value: string) => {
    onSortChange(value); // Notify the parent component
    setIsOpen(false);   // Close the dropdown
  };

  const activeLabel = options.find(opt => opt.value === activeSort)?.label || 'Sort By';

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
       <button 
        className={`filter-button ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{activeLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <ul className="sort-options-list">
          {options.map((option) => (
            <li
              key={option.value}
              className={`sort-option ${activeSort === option.value ? 'active' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortOptions;