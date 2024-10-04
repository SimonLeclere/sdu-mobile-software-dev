import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { formatDate } from './BookedCarCard';
import GiveStars from './giveStars'; // Ensure this path is correct

const PastBookingDetailsScreen = ({ route }) => {
  const { item } = route.params; 
  const { colors } = useTheme(); 
  const styles = getStyles(colors);

  // Debugging: Log the item to check its content
  console.log(item);

  // Check if item is defined
  if (!item) {
    return <Text>No booking details available.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Display the image of the car */}
      <Image source={item.image} style={styles.carImage} />

      {/* Display car details */}
      <Text style={styles.carName}>{item.modelName}</Text>
      <Text style={styles.carBrand}>{item.brandName}</Text>
      
      {/* Display booking dates */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.label}>Booking Dates:</Text>
          <Text style={styles.infoText}>From: {formatDate(item.fromDate)} at {item.pickUpTime}</Text>
          <Text style={styles.infoText}>To: {formatDate(item.toDate)} at {item.dropOffTime}</Text>
        </View>
      </View>
      
      {/* Display location */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.label}>Where?</Text>
          <Text style={styles.infoText}>{item.exactAddress}</Text>
        </View>
      </View>
    
      {/* Display the Give a Star component */}
      <View style={styles.infoContainer}>
        <GiveStars />
      </View>
      
      {/* Add more details here like the payment infos */}
      {/* Keep the rating in memory so that when you leave the page, it's stay */}
      {/* Add a text on the miniature that remind the user to rate their experience */}
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
      backgroundColor: colors.cardBackground
    },
  });
}; 

export default PastBookingDetailsScreen;
