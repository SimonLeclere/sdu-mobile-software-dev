// PastBookingsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import BookedCarCard from './BookedCarCard';
import { useTheme } from '../../contexts/themeContext';
import { getBookedCars } from './bookedCarsData'; // Fetch booked cars

const PastBookingsScreen = ({ navigation }) => {
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

  // Filter past bookings
  const currentDate = new Date();
  const pastBookings = carsData.filter(item => new Date(item.toDate) < currentDate);

  return (
    <View style={styles.container}>      
      {pastBookings.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No past bookings found.
        </Text>
      )}
      
      <FlatList
        data={pastBookings}
        renderItem={({ item }) => <BookedCarCard item={item} />}
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
      backgroundColor: isColorful ? '#fbf8ef' : '#f0f0f0',
      paddingHorizontal: 15,
      paddingTop: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isColorful ? "#fe218b" : "#666",
    },
  });
};

export default PastBookingsScreen;
