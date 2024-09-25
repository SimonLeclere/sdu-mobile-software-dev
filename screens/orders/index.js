import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import BookedCarCard from './BookedCarCard';
import { useTheme } from '../../contexts/themeContext';
import { getBookedCars } from './bookedCarsData'; // Fetch booked cars

const BookedCarsScreen = ({ navigation }) => {
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

  // Separate upcoming bookings
  const currentDate = new Date();
  const upcomingBookings = carsData.filter(item => new Date(item.fromDate) >= currentDate);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Trips</Text>
      
      {upcomingBookings.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No upcoming trips found.
        </Text>
      )}
      
      <FlatList
        data={upcomingBookings}
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

      {/* Link to Past Bookings Screen */}
      <TouchableOpacity onPress={() => navigation.navigate('PastBookings')}>
        <Text style={styles.linkText}>View Past Bookings</Text>
      </TouchableOpacity>
    </View>

  );
};

const getStyles = (isColorful) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isColorful ? '#fbf8ef' : '#f0f0f0',
      paddingHorizontal: 15,
      paddingTop: 55,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isColorful ? "#fe218b" : "#666",
    },
    linkText: {
      fontSize: 14,
      color: 'grey',
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
    },
  });
};

export default BookedCarsScreen;
