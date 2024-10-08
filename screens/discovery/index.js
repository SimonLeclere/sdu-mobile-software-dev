import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import CarCard from './CarCard';
import { useFilters } from '../../contexts/filterContext';
import { useTheme } from '../../contexts/themeContext';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import MapView, { Marker } from 'react-native-maps';
import dayjs from 'dayjs';

import { getCars } from '../../api/cars';
import { getShops } from '../../api/shops';
import FirstOpenView from './firstOpenView';

const MAP_INITIAL_REGION = {
  latitude: 55.39594,
  longitude: 10.38831,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

const DiscoveryScreen = () => {
  
  const [firstOpen, setFirstOpen] = useState(true);

  const [locationQuery, setLocationQuery] = useState('');
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, 'day')]);
  
  const [carsData, setCarsData] = useState([]);
  const [shopsData, setShopsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [shopsInView, setShopsInView] = useState([]);


  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { selectedFilters, setSelectedFilters, setAvailableTagFilters } = useFilters();

  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
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

  const isShopInRegion = useCallback((shop, region) => {
    const { latitude, longitude } = shop.location;
    const { latitudeDelta, longitudeDelta } = region;
    return (
      latitude >= region.latitude - latitudeDelta / 2 &&
      latitude <= region.latitude + latitudeDelta / 2 &&
      longitude >= region.longitude - longitudeDelta / 2 &&
      longitude <= region.longitude + longitudeDelta / 2
    );
  }, []);

  const handleRegionChangeComplete = useCallback((region) => {
    const visibleShops = shopsData.filter(shop => isShopInRegion(shop, region));
    setShopsInView(visibleShops);
    
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0); // to avoid the bottom sheet from being stuck outside the screen
    }

  }, [shopsData, isShopInRegion, bottomSheetRef]);

  useEffect(() => {
    fetchShops();
    fetchCars();
  }, []);

  const filterCars = useMemo(() => {

    const carsDataWithCity = carsData.flatMap(car => {
      return car.shops
        .map(shopId => {
          const shop = shopsData.find(s => s.id === shopId);
          if (shop) {
            return { ...car, city: shop.city, shopId: shop.id }; // Ajoute l'attribut city
          }
          return null; // Si le shopId ne correspond à aucun shop, on ne retourne rien
        })
        .filter(car => car !== null); // Filtrer les null au cas où certains shops ne sont pas trouvés
    });

    return carsDataWithCity
      .filter(car => Object.keys(selectedFilters.tagFilter).every(filter => selectedFilters.tagFilter[filter] ? car.tags.includes(filter) : true))
      .filter(car => car.price >= selectedFilters.priceRange[0] && car.price <= selectedFilters.priceRange[1])
      .filter(car => selectedFilters.vehicleType.length === 0 || selectedFilters.vehicleType.includes(car.type))
      .filter(car => selectedFilters.brand === 'all' || selectedFilters.brand === car.brandName)
      .filter(car => selectedFilters.gearbox === 'all' || selectedFilters.gearbox === car.transmission.toLowerCase())
      .filter(car => shopsInView.some(shop => shop.id === car.shopId));
  }, [carsData, selectedFilters, shopsInView]);

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>


      {
        firstOpen && (
          <FirstOpenView
            setFirstOpen={setFirstOpen}

            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}

            dateRange={dateRange}
            setDateRange={setDateRange}

            animateToRegion={({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
              mapRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta,
              })
            }}
          />
        )
      }


      <View style={styles.header}>
        <SearchBar
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}

          dateRange={dateRange}
          setDateRange={setDateRange}

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

      <MapView
        ref={mapRef}
        key={colors.mapStyle}
        style={styles.map}
        showsCompass={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        customMapStyle={colors.mapStyle}
        initialRegion={MAP_INITIAL_REGION}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPoiClick={e => {
          setLocationQuery(e.nativeEvent.name)
          mapRef.current.animateToRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }}
        onMapReady={() => handleRegionChangeComplete(MAP_INITIAL_REGION)}

        onMarkerPress={e => {
          const shop = shopsData.find(shop => shop.id.toString() === e.nativeEvent.id);
          
          if (!shop) return;
          
          setLocationQuery(shop.city);
          mapRef.current.animateToRegion({
            latitude: shop.location.latitude,
            longitude: shop.location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }}
      >
        {
          shopsData.map(shop => (
            <Marker
              key={shop.id + colors.markerIcon.toString()}
              identifier={shop.id.toString()}
              coordinate={shop.location}
              title={shop.name}
              description={shop.city}
              image={colors.markerIcon}
            />
          ))
        }
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'lightgray' }}
        backgroundStyle={styles.bottomSheet}
      >
        <Text style={styles.carsAvailableText}>{filterCars.length} available cars in this area</Text>
        
        <BottomSheetFlatList
          fadingEdgeLength={150}
          data={filterCars}
          style={styles.bottomSheetFlatList}
          renderItem={({ item }) => <CarCard item={item} location={locationQuery} dateRange={dateRange} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No cars found. Try changing your filters.</Text>}
        />
      </BottomSheet>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    gap: 10,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    color: colors.text,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.text,
  },
  shopsInViewText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheet: {
    borderRadius: 25,
    backgroundColor: colors.background,
  },
  bottomSheetFlatList: {
    backgroundColor: colors.background,
  },
});

export default DiscoveryScreen;