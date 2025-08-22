import React from 'react';

interface Category {
    id: number;
    name: string;
}

interface FilterButtonsProps {
    categories: Category[];
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
    categories,
    activeFilter,
    onFilterChange
}) => {
    return (
        <div className="filter-buttons">
            <button 
                onClick={() => onFilterChange('All')} 
                className={activeFilter === 'All' ? 'active' : ''}
            >
                All
            </button>
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => onFilterChange(category.name)}
                    className={activeFilter === category.name ? 'active' : ''}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;