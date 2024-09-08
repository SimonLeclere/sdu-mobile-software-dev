import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import CarCard from './CarCard';

const carsData = [
  { id: 1, brandName: 'Audi', modelName: 'Sportback RS 5', price: '1.400', image: require('../../assets/cars/Audi RS5 Sportback.png'), type: 'Luxury Car', tags: ['Sporty'] },
  { id: 2, brandName: 'Audi', modelName: 'Cabriolet A5', price: '1.700', image: require('../../assets/cars/Audi A5 Cabriolet.png'), type: 'Luxury Car', tags: ['Convertible', 'Elegant'] },
  { id: 3, brandName: 'Lexus', modelName: 'ES Hybrid', price: '1.500', image: require('../../assets/cars/Lexus ES hybrid.png'), type: 'Family Car', tags: ['Hybrid', 'Comfortable'] },
  { id: 4, brandName: 'Lexus', modelName: 'LS F Sport', price: '2.000', image: require('../../assets/cars/Lexus LS F Sport.png'), type: 'Luxury Car', tags: ['Sporty', 'Luxury'] },
  { id: 5, brandName: 'Tesla', modelName: 'Model 3', price: '1.200', image: require('../../assets/cars/Tesla model 3.png'), type: 'Electric Car', tags: ['Electric', 'Autonomous'] },
  { id: 6, brandName: 'Toyota', modelName: 'Prius', price: '1.000', image: require('../../assets/cars/Toyota prius.png'), type: 'Electric Car', tags: ['Electric', 'Economical'] },
  { id: 7, brandName: 'BMW', modelName: 'X5', price: '1.800', image: require('../../assets/cars/BMW X5.png'), type: 'SUV', tags: ['Luxury', 'Spacious'] },
  { id: 8, brandName: 'Ford', modelName: 'Mustang', price: '1.600', image: require('../../assets/cars/Ford mustang.png'), type: 'Sport Car', tags: ['Fast', 'Classic'] },
  { id: 9, brandName: 'Chevrolet', modelName: 'Tahoe', price: '1.900', image: require('../../assets/cars/Chevrolet Tahoe.png'), type: 'SUV', tags: ['Large', 'Comfortable'] },
  { id: 10, brandName: 'Nissan', modelName: 'Leaf', price: '900', image: require('../../assets/cars/Nissan Leaf.png'), type: 'Electric Car', tags: ['Electric', 'Compact'] }
];


const DiscoveryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  // reduce carsData to get all the unique tags
  const filters = carsData.reduce((acc, car) => {
    car.tags.forEach((tag) => {
      if (!acc.includes(tag)) acc.push(tag);
    });
    return acc;
  }, []);

  const filterCars = (cars) => {
    return cars.filter((car) => {
      const isSearchMatch = `${car.brandName} ${car.modelName}`.toLowerCase().includes(searchQuery.toLowerCase());
      const isFilterMatch = Object.keys(selectedFilters).every((filter) => {
        return selectedFilters[filter] ? car.tags.includes(filter) : true;
      });
      return isSearchMatch && isFilterMatch;
    });
  };

  const data = filterCars(carsData);

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterButtons
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        filters={filters}
      />
      
      {
        data.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No cars found. Try changing your filters.
          </Text>
        )
      }
      
      <FlatList
        data={data}
        renderItem={({ item }) => <CarCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingTop: 40,
    flex: 1,
    gap: 10,
  },
});

export default DiscoveryScreen;