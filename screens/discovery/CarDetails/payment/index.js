import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { ChevronDownIcon, ChevronUpIcon, BuildingStorefrontIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../../../contexts/themeContext';
import { useReservations } from '../../../../contexts/reservationContext';
import LottieView from "lottie-react-native";
import { getShopById } from '../../../../api/shops';

const PaymentScreen = ({ route, navigation }) => {
  const { item } = route.params; // Get the booking item details
  const { colors } = useTheme();
  
  // States for form inputs and error messages
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  
  // Error states
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const shop = getShopById(item.shopId);
  const animationRef = React.useRef(null);
  const { addReservation } = useReservations(); // Use the context to add a new reservation

  const styles = getStyles(colors);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePay = async () => {
    const newErrorMessages = {};

    if (!lastName) newErrorMessages.lastName = 'Last name is required';
    if (!firstName) newErrorMessages.firstName = 'First name is required';
    if (!email) newErrorMessages.email = 'Email is required';
    if (!phoneNumber) newErrorMessages.phoneNumber = 'Phone number is required';
    if (!birthdate) newErrorMessages.birthdate = 'Birthdate is required';

    // Check if there are any errors
    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return; // Stop the payment process
    }

    setIsLoading(true);

    const newReservation = {
      car: item,
      driver: { lastName, firstName, email, phoneNumber, birthdate }
    };

    await addReservation(newReservation);

    setIsLoading(false);
    setShowPaymentConfirmation(true);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Booking Details</Text>

        {/* Display booking details */}
        <View style={styles.bookingDetails}>
          <View style={styles.carInfoContainer}>
            <Image source={item.image} style={styles.carImage} />
            <View>
              <Text style={styles.carName}>{item.brandName} {item.modelName}</Text>
              <Text style={styles.infoText}>{item.tripDays} days trip</Text>
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

          {isExpanded && (
            <View style={styles.locations}>
              <View style={styles.detailsContainer}>
                <View style={styles.iconContainer}>
                  <BuildingStorefrontIcon color={colors.infoText} size={24} />
                </View>
                <View style={styles.locationContainer}>
                  <Text style={styles.detailsTitle}>Pick-up Location</Text>
                  <Text style={styles.detailsText}>{shop.name}</Text>
                  <Text style={styles.detailsText}>{shop.address}</Text>
                  <Text style={styles.detailsText}>{formatDate(item.fromDate)}</Text>
                </View>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.iconContainer}>
                  <BuildingStorefrontIcon color={colors.infoText} size={24} />
                </View>
                <View style={styles.locationContainer}>
                  <Text style={styles.detailsTitle}>Return Location</Text>
                  <Text style={styles.detailsText}>{shop.name}</Text>
                  <Text style={styles.detailsText}>{shop.address}</Text>
                  <Text style={styles.detailsText}>{formatDate(item.toDate)}</Text>
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

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errorMessages.firstName && styles.inputError]}
              placeholder="First Name"
              placeholderTextColor={colors.secondaryText}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text)
                setErrorMessages({ ...errorMessages, firstName: '' })
              }}
            />
            {errorMessages.firstName && <Text style={styles.errorText}>{errorMessages.firstName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errorMessages.lastName && styles.inputError]}
              placeholder="Last Name"
              placeholderTextColor={colors.secondaryText}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text)
                setErrorMessages({ ...errorMessages, lastName: '' })
              }}
            />
            {errorMessages.lastName && <Text style={styles.errorText}>{errorMessages.lastName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errorMessages.email && styles.inputError]}
              placeholder="Email"
              placeholderTextColor={colors.secondaryText}
              value={email}
              onChangeText={(text) => {
                setEmail(text)
                setErrorMessages({ ...errorMessages, email: '' })
              }}
              keyboardType="email-address"
            />
            {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errorMessages.phoneNumber && styles.inputError]}
              placeholder="Phone Number"
              placeholderTextColor={colors.secondaryText}
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text)
                setErrorMessages({ ...errorMessages, phoneNumber: '' })
              }}
              keyboardType="phone-pad"
            />
            {errorMessages.phoneNumber && <Text style={styles.errorText}>{errorMessages.phoneNumber}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errorMessages.birthdate && styles.inputError]}
              placeholder="Birthdate (YYYY-MM-DD)"
              placeholderTextColor={colors.secondaryText}
              value={birthdate}
              onChangeText={(text) => {
                setBirthdate(text)
                setErrorMessages({ ...errorMessages, birthdate: '' })
              }}
            />
            {errorMessages.birthdate && <Text style={styles.errorText}>{errorMessages.birthdate}</Text>}
          </View>
        </View>

        <View style={styles.priceDetails}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.priceText}>
            {item.price} kr
          </Text>
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          {
            isLoading ? <ActivityIndicator size="small" color={colors.accent} /> : <Text style={styles.payButtonText}>PAY</Text>
          }
        </TouchableOpacity>

        {/* Modal for Payment Confirmation */}
        <Modal
          onShow={() => animationRef.current.play()}
          transparent={true}
          visible={showPaymentConfirmation}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <LottieView
                ref={animationRef}
                source={require('../../../../assets/paymentconfirmation - Copie.lottie/animations/12345.json')}
                autoPlay={false}
                loop={false}
                style={styles.lottieAnimation}
                onAnimationFinish={() => {
                  setShowPaymentConfirmation(false);
                  navigation.navigate('Orders');
                }}
              />
            </View>
          </View>
        </Modal>
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
  bookingDetails: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
  },
  locations: {
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    gap: 20,
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
    gap: 15,
  },
  input: {
    height: 50,
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    // marginBottom: 15,
    color: colors.text,
    backgroundColor: colors.inputBackground,
  },
  inputContainer: {
    
  },
  payButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 400,
    height: 250,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

export default PaymentScreen;
