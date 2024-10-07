
import React, { createContext, useContext, useState, ReactNode } from 'react';

const FilterContext = createContext(undefined);

const defaultFilters = {
  sortBy: 'relevance',

  maxPrice: Number.MAX_VALUE,
  priceRange: [0, Number.MAX_VALUE],
  
  vehicleType: [],
  
  brand: 'all',
  brandOptions: ['all'],
  
  gearbox: 'all',
  
  tagFilter: {},
};

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState(defaultFilters);
  const [availableTagFilters, setAvailableTagFilters] = useState([]);

  const resetSelectedFilters = () => {
    setSelectedFilters((prev) => ({
      ...prev,
      sortBy: defaultFilters.sortBy,
      priceRange: [0, prev.maxPrice],
      vehicleType: defaultFilters.vehicleType,
      brand: defaultFilters.brand,
      gearbox: defaultFilters.gearbox,
      tagFilter: defaultFilters.tagFilter,
    }));
  }

  let atLeastOneFilterSet = false;

  if (selectedFilters.sortBy !== defaultFilters.sortBy) atLeastOneFilterSet = true;
  if (selectedFilters.priceRange[0] !== defaultFilters.priceRange[0] || selectedFilters.priceRange[1] < selectedFilters.maxPrice) atLeastOneFilterSet = true;
  if (selectedFilters.vehicleType.length > 0) atLeastOneFilterSet = true;
  if (selectedFilters.brand !== defaultFilters.brand) atLeastOneFilterSet = true;
  if (selectedFilters.gearbox !== defaultFilters.gearbox) atLeastOneFilterSet = true;

  return (
    <FilterContext.Provider value={{ selectedFilters, availableTagFilters, setSelectedFilters, setAvailableTagFilters, resetSelectedFilters, atLeastOneFilterSet }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
