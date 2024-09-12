import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/themeContext";

// Helper function to calculate days left
const calculateDaysLeft = (fromDate) => {
    const currentDate = new Date(); // Today's date
    const bookedDate = new Date(fromDate); // Convert the string date to a Date object
  
    // Calculate the time difference in milliseconds
    const timeDiff = bookedDate - currentDate;
  
    // Convert time difference from milliseconds to days
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    return daysLeft > 0 ? daysLeft : 0; // Ensure no negative days are returned
  };

const BookedCarCard = ({ item }) => {
  const navigation = useNavigation();

  const { isColorful } = useTheme();
  const styles = getStyles(isColorful);

  // Calculate days left until the booking starts
  const daysLeft = calculateDaysLeft(item.fromDate);

// Conditional background color for the days left text
  const daysLeftBackgroundColor = daysLeft < 10 ? '#6FCF97' : '#BDBDBD'; // Green if less than 10 days, grey otherwise

  return (
    <TouchableOpacity
      style={styles.carCard}
    >
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{item.modelName}</Text>
        <Text style={styles.carBrand}>{item.brandName}</Text>
        <Text style={styles.carBookingDate}>
          {`From: ${item.fromDate}`}
        </Text>
        <Text style={styles.carBookingDate}>
          {`To: ${item.toDate}`}
        </Text>
        <Text style={styles.carLocation}>
          {`Location: ${item.location}`}
        </Text>
        <View style={styles.daysLeftContainer}>
          <Text style={[styles.daysLeftText, { backgroundColor: daysLeftBackgroundColor }]}>
            {daysLeft > 0 ? `${daysLeft} days before adventure` : "Booking date has passed"}
          </Text>
          <ArrowRightIcon size={20} color={styles.arrowColor} style={styles.arrowIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (isColorful) => {
    const { width } = Dimensions.get("window");
    return StyleSheet.create({
      carCard: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.9,
        alignSelf: "center",
      },
      carImage: {
        width: 120,
        height: 90,
        borderRadius: 10,
        marginRight: 15,
      },
      cardContent: {
        flex: 1,
      },
      carName: {
        fontSize: 16,
        fontWeight: "bold",
        color: isColorful ? "#003049" : "#000",
        marginBottom: 5,
      },
      carBrand: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
      },
      carBookingDate: {
        fontSize: 12,
        color: "#888",
        marginBottom: 5,
      },
      carLocation: {
        fontSize: 12,
        color: "#888",
      },
      daysLeftContainer: {
        position: 'relative',
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
      },
      daysLeftText: {
        fontSize: 10,
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      arrowIcon: {
        position: 'absolute',
        right: 0,
      },
      bottomContent: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
      },
      arrowColor: isColorful ? "#c1121f" : "#666",
    });
};
  

export default BookedCarCard;
