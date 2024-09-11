import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';

import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import CarCard from './CarCard';

import { useFilters } from '../../contexts/filterContext';
import { useTheme } from '../../contexts/themeContext';

import { getCars } from '../../api/cars';

const DiscoveryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { isColorful } = useTheme();
  const styles = getStyles(isColorful);

  const { selectedFilters, setSelectedFilters, setAvailableTagFilters } = useFilters();

  // Fetch cars data when the component mounts
  const fetchCars = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      
      const data = await getCars();
      setCarsData(data);
      
      // Reduce carsData to get all the unique tags
      const filters = data.reduce((acc, car) => {
        car.tags.forEach((tag) => {
          if (!acc.includes(tag)) acc.push(tag);
        });
        return acc;
      }, []);

      setAvailableTagFilters(filters);

      // find the max price to round it to the nearest 1000 (upper bound)
      const maxPrice = Math.max(...data.map((car) => car.price));
      const roundedMaxPrice = Math.ceil(maxPrice / 1000) * 1000;
      setSelectedFilters((prev) => ({ ...prev, maxPrice: roundedMaxPrice, priceRange: [0, roundedMaxPrice] }));

      // Set the brand options
      const brandOptions = data.reduce((acc, car) => {
        if (!acc.find((brand) => brand.value === car.brandName)) acc.push({ label: car.brandName, value: car.brandName });
        return acc;
      }, [{ label: 'All brands', value: 'all' }]);
      setSelectedFilters((prev) => ({ ...prev, brandOptions }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [setAvailableTagFilters]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const filterCarsByTag = (cars) => {
    return cars.filter((car) => {
      const isSearchMatch = `${car.brandName} ${car.modelName}`.toLowerCase().includes(searchQuery.toLowerCase());
      const isFilterMatch = Object.keys(selectedFilters.tagFilter).every((filter) => {
        return selectedFilters.tagFilter[filter] ? car.tags.includes(filter) : true;
      });
      return isSearchMatch && isFilterMatch;
    });
  };

  const filterCarsByPrice = (cars) => {
    return cars.filter((car) => car.price >= selectedFilters.priceRange[0] && car.price <= selectedFilters.priceRange[1]);
  };

  const filterCarsByVehicleType = (cars) => {
    return cars.filter((car) => selectedFilters.vehicleType.length === 0 || selectedFilters.vehicleType.includes(car.type));
  };

  const filterCarsByBrand = (cars) => {
    return cars.filter((car) => selectedFilters.brand === 'all' || selectedFilters.brand === car.brandName);
  };

  const filterCarsByGearbox = (cars) => {
    return cars.filter((car) => selectedFilters.gearbox === 'all' || selectedFilters.gearbox === car.transmission.toLowerCase());
  };

  let data = filterCarsByTag(carsData);
  data = filterCarsByPrice(data);
  data = filterCarsByVehicleType(data);
  data = filterCarsByBrand(data);
  data = filterCarsByGearbox(data);  

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterButtons/>

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchCars}
            colors={['#0000ff']} // Optionnel: couleur de l'anneau de chargement
          />
        }
      />

    </View>
  );
};

const getStyles = (isColorful) => {
  if (isColorful) {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fdf0d5',
        paddingHorizontal: 15,
        paddingTop: 40,
        flex: 1,
        gap: 10,
      },
    });
  }

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 15,
      paddingTop: 40,
      flex: 1,
      gap: 10,
    },
  });
};

export default DiscoveryScreen;
