import { useFocusEffect } from '@react-navigation/native';
import { useReservations } from '../../contexts/reservationContext';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BookedCarCard from './BookedCarCard';
import { useTheme } from '../../contexts/themeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';


const BookedCarsScreen = ({ navigation }) => {
  const { reservations } = useReservations(); // Fetch reservations from context
  const { colors } = useTheme();
  const styles = getStyles(colors);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen is focused. Refreshing reservation list.');
      
    }, [])
  );
  

  const currentDate = new Date();
  const upcomingBookings = reservations.filter(item => {
    const fromDate = new Date(item.car.fromDate);
    const toDate = new Date(item.car.toDate);

    // Include bookings where current date is between fromDate and toDate, or fromDate is in the future
    return fromDate <= currentDate && currentDate <= toDate || fromDate >= currentDate;
  });

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
        renderItem={({ item }) => <BookedCarCard item={item.car} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => console.log('Refreshing')}
        refreshing={false}
      />

      {/* Link to Past Bookings Screen */}
      <TouchableOpacity onPress={() => navigation.navigate('PastBookings')}>
        <Text style={styles.linkText}>View Past Bookings</Text>
      </TouchableOpacity>
    </View>
  );
};


const getStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 15,
      paddingTop: 55,
    },
    title: {
      fontSize: 70,
      lineHeight: 70,
      fontFamily: 'quebecks',
      marginBottom: 20,
      color: colors.accent,
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
