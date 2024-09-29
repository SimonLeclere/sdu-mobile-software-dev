import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { formatDate } from './BookedCarCard';

const BookingDetailsScreen = ({ route }) => {
  const { item } = route.params; 
  const { colors } = useTheme(); 
  const styles = getStyles(colors);


  return (
    <View style={styles.container}>
      {/* Display the image of the car */}
      <Image source={item.image} style={styles.carImage} />

      {/* Display car details */}
      <Text style={styles.carName}>{item.modelName}</Text>
      <Text style={styles.carBrand}>{item.brandName}</Text>
      
      {/* Display booking dates */}
      <Text style={styles.label}>Booking Dates:</Text>
      <Text style={styles.infoText}>From: {formatDate(item.fromDate)}</Text>
      <Text style={styles.infoText}>To: {formatDate(item.toDate)}</Text>

      
      {/* Display location */}
      <Text style={styles.label}>Pick Up:</Text>
      <Text style={styles.infoText}>{item.location} at {item.pickUpTime}</Text> 
      
      {/* Add the complete address with a link to open a map */}
      {/* Add more details here like the payment infos */}

    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
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
    color: colors.tertiaryText,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: colors.infoText,
    marginBottom: 5,
  }
});

export default BookingDetailsScreen;
