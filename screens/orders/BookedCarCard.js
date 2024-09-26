import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/themeContext";

export const calculateDaysLeft = (fromDate) => {
    const currentDate = new Date(); 
    const bookedDate = new Date(fromDate); 
  
    const timeDiff = bookedDate - currentDate;
  
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    return daysLeft > 0 ? daysLeft : 0; 
};

export const calculateEndDate = (toDate) => {
  return new Date(toDate); // Convert the string date to a Date object
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
  
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-GB', options);
  
    const monthWithDot = formattedDate.replace(/(\b\w+\b)(?=\s\d{4})/, (month) => {
      return month.endsWith('.') ? month : `${month}.`;
    });
  
    return monthWithDot;
};

const BookedCarCard = ({ item }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const endDate = calculateEndDate(item.toDate);
  const currentDate = new Date();

  const daysLeft = calculateDaysLeft(item.fromDate);

  const daysLeftBackgroundColor = daysLeft < 10 ? '#6FCF97' : '#BDBDBD'; 

  return (
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => {
        if (currentDate > endDate) {
          navigation.navigate("PastBookingDetails", { item });
        } else {
          navigation.navigate("BookingDetails", { item });
        }
      }}
    >
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{item.modelName}</Text>
        <Text style={styles.carBrand}>{item.brandName}</Text>
        <Text style={styles.carBookingDate}>
          {`From: ${formatDate(item.fromDate)}`}
        </Text>
        <Text style={styles.carBookingDate}>
          {`To: ${formatDate(item.toDate)}`}
        </Text>
        <Text style={styles.carLocation}>
          {`Location: ${item.location}`}
        </Text>
        {daysLeft > 0 ? (
          <View style={styles.daysLeftContainer}>
            <Text style={[styles.daysLeftText, { backgroundColor: daysLeftBackgroundColor }]}>
              {`${daysLeft} days before adventure`}
            </Text>
            <ArrowRightIcon size={20} color={styles.arrowColor} style={styles.arrowIcon} />
          </View>
        ) : (
          <View style={styles.arrowContainer}>
          <ArrowRightIcon size={20} color={styles.arrowColor} style={styles.arrowIcon} />
        </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors) => {
    const { width } = Dimensions.get("window");
    return StyleSheet.create({
      carCard: {
        backgroundColor: colors.cardBackground,
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
        color: colors.primary,
        marginBottom: 5,
      },
      carBrand: {
        fontSize: 14,
        color: colors.secondaryText,
        marginBottom: 5,
      },
      carBookingDate: {
        fontSize: 12,
        color: colors.timeLocationText,
        marginBottom: 5,
      },
      carLocation: {
        fontSize: 12,
        color: colors.timeLocationText,
      },
      daysLeftContainer: {
        position: 'relative',
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
      },
      daysLeftText: {
        fontSize: 10,
        color: colors.text,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      arrowIcon: {
        position: 'absolute',
        right: 0,
      },
      arrowContainer: {
        position: 'relative',
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
      },
      bottomContent: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
      },
      arrowColor: colors.accent,
    });
};

export default BookedCarCard;
