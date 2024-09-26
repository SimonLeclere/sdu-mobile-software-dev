import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import CarCard from './CarCard';
import { useFilters } from '../../contexts/filterContext';
import { useTheme } from '../../contexts/themeContext';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import MapView, { Marker } from 'react-native-maps';

import { getCars } from '../../api/cars';
import { getShops } from '../../api/shops';

const DiscoveryScreen = () => {
  const [locationQuery, setLocationQuery] = useState('');
  
  const [carsData, setCarsData] = useState([]);
  const [shopsData, setShopsData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { isColorful } = useTheme();
  const styles = getStyles(isColorful);
  const { selectedFilters, setSelectedFilters, setAvailableTagFilters } = useFilters();

  const mapRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "80%"], []);

  const fetchShops = useCallback(async () => {
    try {
      const data = await getShops();
      setShopsData(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const data = await getCars();
      setCarsData(data);
      const filters = data.reduce((acc, car) => {
        car.tags.forEach(tag => {
          if (!acc.includes(tag)) acc.push(tag);
        });
        return acc;
      }, []);

      setAvailableTagFilters(filters);

      const maxPrice = Math.max(...data.map(car => car.price));
      const roundedMaxPrice = Math.ceil(maxPrice / 1000) * 1000;
      setSelectedFilters(prev => ({ ...prev, maxPrice: roundedMaxPrice, priceRange: [0, roundedMaxPrice] }));

      const brandOptions = data.reduce((acc, car) => {
        if (!acc.find(brand => brand.value === car.brandName)) {
          acc.push({ label: car.brandName, value: car.brandName });
        }
        return acc;
      }, [{ label: 'All brands', value: 'all' }]);
      setSelectedFilters(prev => ({ ...prev, brandOptions }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [setAvailableTagFilters, setSelectedFilters]);

  useEffect(() => {
    fetchCars();
    fetchShops();
  }, [fetchCars]);

  const filterCars = useMemo(() => {
    return carsData
      .filter(car => Object.keys(selectedFilters.tagFilter).every(filter => selectedFilters.tagFilter[filter] ? car.tags.includes(filter) : true))
      .filter(car => car.price >= selectedFilters.priceRange[0] && car.price <= selectedFilters.priceRange[1])
      .filter(car => selectedFilters.vehicleType.length === 0 || selectedFilters.vehicleType.includes(car.type))
      .filter(car => selectedFilters.brand === 'all' || selectedFilters.brand === car.brandName)
      .filter(car => selectedFilters.gearbox === 'all' || selectedFilters.gearbox === car.transmission.toLowerCase());
  }, [carsData, selectedFilters]);

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Search and Filter Header */}
      <View style={styles.header}>
        <SearchBar
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          animateToRegion={({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta,
              longitudeDelta,
            })
          }}
        />
        <FilterButtons />
      </View>

      {/* Map behind the header and the bottom sheet */}
      <MapView
        ref={mapRef}
        style={styles.map}
        showsCompass={false}
        rotateEnabled={false}
        pitchEnabled={false}
        initialRegion={{
          // Default to Odense, Denmark
          latitude: 55.39594,
          longitude: 10.38831,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPoiClick={e => {
          setLocationQuery(e.nativeEvent.name)
          mapRef.current.animateToRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }}
      >
        {
          shopsData.map(shop => (
            <Marker
              key={shop.id}
              coordinate={shop.location}
              title={shop.name}
              description={shop.city}
              image={require('../../assets/marker.png')}
            />
          ))
        }
      </MapView>

      <BottomSheet
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'lightgray' }}
        backgroundStyle={{ borderRadius: 25 }}
      >
        
        {/* Display number of available cars */}
        <Text style={styles.carsAvailableText}>{filterCars.length} available cars</Text>
        
        <BottomSheetFlatList
          data={filterCars}
          renderItem={({ item }) => <CarCard item={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No cars found. Try changing your filters.</Text>}
        />
      </BottomSheet>
    </View>
  );
};

const getStyles = (isColorful) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Make sure the header is above the map
    gap: 10,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // This will make the map fill the whole screen
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
  },
  carsAvailableText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DiscoveryScreen;
