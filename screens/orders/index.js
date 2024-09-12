import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';

import BookedCarCard from './BookedCarCard'; // Updated to use BookedCarCard instead of CarCard
import { useTheme } from '../../contexts/themeContext';
import { getBookedCars } from './bookedCarsData'; // Fetch booked cars

const BookedCarsScreen = () => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { isColorful } = useTheme();
  const styles = getStyles(isColorful);

  // Fetch booked cars data when the component mounts
  const fetchCars = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const data = await getBookedCars(); // Fetch booked cars
      setCarsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Error: {error}</Text>;
  }

  return (
    
    <View style={styles.container}>
      <Text>Orders</Text>
      {
        carsData.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No booked cars found.
          </Text>
        )
      }
      
      <FlatList
        data={carsData}
        renderItem={({ item }) => <BookedCarCard item={item} />} // Use BookedCarCard for each car
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchCars}
            colors={['#0000ff']}
          />
        }
      />
    </View>
  );
};

const getStyles = (isColorful) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isColorful ? '#fdf0d5' : '#f0f0f0',
      paddingHorizontal: 15,
      paddingTop: 40,
    },
  });
};

export default BookedCarsScreen;
