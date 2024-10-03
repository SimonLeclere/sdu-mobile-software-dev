import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronDownIcon, ChevronUpIcon, BuildingStorefrontIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../../../contexts/themeContext';

const PaymentScreen = ({ route, navigation }) => {
  const { item } = route.params; // Get the booking item details
  const { colors } = useTheme();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const styles = getStyles(colors);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Booking Details</Text>

        {/* Display booking details */}
        <View style={styles.bookingDetails}>

        {/* Horizontal layout for car image and details */}
        <View style={styles.carInfoContainer}>
          <Image source={item.image} style={styles.carImage} />
          
          <View>
            <Text style={styles.carName}>{item.brandName} {item.modelName}</Text>
            <Text style={styles.infoText}>{item.tripDays} days trip</Text>

            {/* Expand/Collapse Button */}
            <TouchableOpacity style={styles.toggleButton} onPress={toggleExpand}>
              <Text style={styles.toggleButtonText}>
                {isExpanded ? 'Hide Details' : 'Show Details'}
              </Text>
              {isExpanded ? (
                <ChevronUpIcon color={colors.primary} size={20} />
              ) : (
                <ChevronDownIcon color={colors.primary} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Expandable panel with booking details */}
        {isExpanded && (
          <View style={styles.bookingDetails}>
          {/* Pickup Location */}
          <View style={styles.detailsContainer}>
            <View style={styles.iconContainer}>
              {/* Replace with your actual icon component */}
              <BuildingStorefrontIcon color={colors.infoText} size={24} />
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.detailsTitle}>Pick-up Location</Text>
              <Text style={styles.detailsText}>{item.location}</Text>
              <Text style={styles.detailsText}>{formatDate(item.fromDate)} | Time</Text>
            </View>
          </View>
        
          {/* Line Separator */}
          <View style={styles.separator} />
        
          {/* Return Location */}
          <View style={styles.detailsContainer}>
            <View style={styles.iconContainer}>
              {/* Replace with your actual icon component */}
              <BuildingStorefrontIcon color={colors.infoText} size={24} />
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.detailsTitle}>Return Location</Text>
              <Text style={styles.detailsText}>{item.location}</Text>
              <Text style={styles.detailsText}>{formatDate(item.toDate)} | Time</Text>
            </View>
          </View>
        </View>
        
        )}
      </View>

      <View style={styles.bookingDetails}>
        <View>
          <Text style={styles.carName}>Forfait</Text>
          <Text style={styles.infoText}>
            {item.selectedForfait === '300km' ? '300 km' : 'Unlimited kilometers'}
          </Text>
          <Text style={styles.detailsText}>
            {item.selectedForfait === '300km' ? 'Up to 300 km, ideal for short trips. Additional kilometers will be charged at 1kr per km.' : 'Travel without limits.'}
          </Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>      
        <View>
          <Text style={styles.carName}>Insurance</Text>
          <Text style={styles.infoText}>
            {item.selectedInsurance === 'basic' ? 'Basic' : 'Premium'}
          </Text>
          <Text style={styles.detailsText}>
            {item.selectedForfait === 'basic' ? 'Covers vehicle damage and liability.' : 'Full coverage with reduced liability.'}
          </Text>
        </View>
      </View>

        {/* Driver information form */}
        <View style={styles.driverInfo}>
          <Text style={styles.title}>Driver Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor={colors.secondaryText}
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor={colors.secondaryText}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.secondaryText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={colors.secondaryText}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Birthdate (YYYY-MM-DD)"
            placeholderTextColor={colors.secondaryText}
            value={birthdate}
            onChangeText={setBirthdate}
          />
        </View>

        <View style={styles.priceDetails}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.priceText}>
            {item.price} kr
          </Text>
        </View>



        {/* Pay Now Button */}
        <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('Payment', { item, driver: { lastName, firstName, email, phoneNumber, birthdate } })}>
          <Text style={styles.payButtonText}>Pay & Book</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Style definitions
const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
  },
  iconContainer: {
    marginRight: 10, // Space between icon and text
  },
  locationContainer: {
    flex: 1, // Take remaining space for text
  },
  separator: {
    width: 1,
    height: 30, // Thickness of the line
    backgroundColor: 'black', // Color of the line
    marginVertical: 10, // Space around the line
  },
  bookingDetails: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  detailsTitle: { 
    fontSize: 12,
    color: colors.secondaryText,
  },
  driverInfo: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: colors.text,
    backgroundColor: colors.inputBackground,
  },
  payButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 'auto'
  },  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.accent,
  },
  carInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  carImage: {
    width: '40%',
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginRight: 5,
  },
  expandedPanel: {
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    },
  totalText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  priceDetails: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
  },

});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

export default PaymentScreen;
