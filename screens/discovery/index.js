import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import CarCard from './CarCard';

const carsData = [
  { id: 1, name: 'Sportback RS 5', price: '1.400 kr', image: require('../../assets/car1.png'), type: 'Luxury Car', tags: ['Sporty'] },
  { id: 2, name: 'Cabriolet A5', price: '1.700 kr', image: require('../../assets/car1.png'), type: 'Luxury Car', tags: ['Convertible', 'Elegant'] },
  { id: 3, name: 'ES Hybrid 2022', price: '1.500 kr', image: require('../../assets/car1.png'), type: 'Family Car', tags: ['Hybrid', 'Comfortable'] },
  { id: 4, name: 'LS F Sport', price: '2.000 kr', image: require('../../assets/car1.png'), type: 'Luxury Car', tags: ['Sporty', 'Luxury'] },
  { id: 5, name: 'Tesla Model 3', price: '1.200 kr', image: require('../../assets/car1.png'), type: 'Electric Car', tags: ['Electric', 'Autonomous'] },
  { id: 6, name: 'Toyota Prius', price: '1.000 kr', image: require('../../assets/car1.png'), type: 'Electric Car', tags: ['Electric', 'Economical'] },
  { id: 7, name: 'BMW X5', price: '1.800 kr', image: require('../../assets/car1.png'), type: 'SUV', tags: ['Luxury', 'Spacious'] },
  { id: 8, name: 'Ford Mustang', price: '1.600 kr', image: require('../../assets/car1.png'), type: 'Sport Car', tags: ['Fast', 'Classic'] },
  { id: 9, name: 'Chevrolet Tahoe', price: '1.900 kr', image: require('../../assets/car1.png'), type: 'SUV', tags: ['Large', 'Comfortable'] },
  { id: 10, name: 'Nissan Leaf', price: '900 kr', image: require('../../assets/car1.png'), type: 'Electric Car', tags: ['Electric', 'Compact'] }
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
      const isSearchMatch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
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