import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { formatDate } from './BookedCarCard';
import { useReservations } from '../../contexts/reservationContext';

const BookingDetailsScreen = ({ route }) => {
  const { itemId } = route.params;
  const { reservations } = useReservations();
  const { colors } = useTheme(); 
  const styles = getStyles(colors);

  const reservation = reservations.find(res => res.id === itemId);

  if (!reservation) {
    return <Text>No reservation found.</Text>;
  }

  const { car, driver } = reservation;


  const openMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.exactAddress)}`;
    Linking.openURL(mapUrl);
  };

  return (
    <View style={styles.container}>
      {/* Car Image */}
      <Image source={car.image} style={styles.carImage} />

      {/* Car Info */}
      <Text style={styles.carName}>{car.modelName}</Text>
      <Text style={styles.carBrand}>{car.brandName}</Text>
      
      {/* Booking Dates */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.label}>Booking Dates:</Text>
          <Text style={styles.infoText}>From: {formatDate(car.fromDate)}</Text>
          <Text style={styles.infoText}>To: {formatDate(car.toDate)}</Text>
        </View>
      </View>

      {/* Pickup and Dropoff Location */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.label}>Where?</Text>
          <Text style={styles.infoText}>{car.exactAddress}</Text>
          <Text style={styles.linkText} onPress={openMap}>Open in Maps</Text>
        </View>
      </View>

      {/* Driver Information */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.label}>Driver Information:</Text>
          <Text style={styles.infoText}>Name: {driver.firstName} {driver.lastName}</Text>
          <Text style={styles.infoText}>Email: {driver.email}</Text>
          <Text style={styles.infoText}>Phone: {driver.phoneNumber}</Text>
          <Text style={styles.infoText}>Birthdate: {driver.birthdate}</Text>
        </View>
      </View>    
    </View>
  );
};

const getStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    carImage: {
      width: '80%',
      height: 150,
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 20,
    },
    carName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 10,
    },
    carBrand: {
      fontSize: 18,
      color: colors.secondaryText,
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.secondaryText,
    },
    infoText: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 5,
    }, 
    infoContainer: {
      borderRadius: 20,
      padding: 10,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 20,
      flexDirection: 'row',
      gap: 10,
      backgroundColor: colors.cardBackground,
    },
    linkText: {
      color: colors.primary,
      textDecorationLine: 'underline',
      marginTop: 5,
    },
  });
};

export default BookingDetailsScreen;
