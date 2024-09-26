import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { UserIcon, BoltIcon } from 'react-native-heroicons/outline'; 
import { useTheme } from '../../../contexts/themeContext';

import { getCarById } from '../../../api/cars';

export default function CarDetails({ route, navigation }) {

  const { carId } = route.params;
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colors } = useTheme()
  const styles = getStyles(colors)

  const [selectedForfait, setSelectedForfait] = useState('300km'); 
  const [selectedInsurance, setSelectedInsurance] = useState('basic');


  const handleForfaitSelection = (forfait) => {
    setSelectedForfait(forfait);
  };

  const handleInsuranceSelection = (insurance) => {
    setSelectedInsurance(insurance);
  };


  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const data = await getCarById(carId);
        setCarData(data);
      } catch (err) {
        setError('Failed to load car data');
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCarData();
    }
  }, [carId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!carData) {
    return (
      <View style={styles.container}>
        <Text>Car not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.carCard}
      >
        <Image source={carData.image} style={styles.carImage} />
        <View style={styles.cardContent}>
          <Text style={styles.carName}>{carData.modelName}</Text>
          <Text style={styles.carBrand}>{carData.brandName}</Text>

          <View style={styles.iconRow}>
            <BoltIcon color={colors.infoText} size={18} />
            <Text style={styles.subtitle}>{carData.transmission}</Text>
          </View>

          <View style={styles.iconRow}>
            <BoltIcon color={colors.infoText} size={18} />
            <Text style={styles.subtitle}>{carData.fuelType}</Text>
          </View>

          <View style={styles.iconRow}>
            <UserIcon color={colors.infoText} size={18} />
            <Text style={styles.subtitle}>{carData.seatingCapacity}</Text>
          </View>
        </View>

          {/* <View style={styles.tagContainer}>
            {carData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View> */}
          {/* <Text style={styles.footnote}>
            When renting a vehicle, it’s important to understand your insurance coverage. Our rental cars come with basic insurance included, which protects you against damage to the vehicle and liability for injuries to others.We recommend checking your personal auto insurance policy and credit card benefits, as they may offer additional coverage during your rental period. If you have questions or need assistance, our customer service team is here to help!
          </Text> */}
        <View style={styles.paymentAdditionInfos}>
          {/* Kilometer Forfait */}
          <Text style={styles.carBrand}>Kilometer Forfait:</Text>

          <TouchableOpacity
            style={[
              styles.framedBox,
              selectedForfait === '300km' ? styles.selectedBox : {},
            ]}
            onPress={() => handleForfaitSelection('300km')}
          >
            <Text style={styles.titleAdditionInfo}>300 kilometers</Text>
            <Text style={styles.smallInfo}>Up to 300 km, ideal for short trips. Additional kilometers will be charged at 1kr per km.</Text>
            <Text style={styles.price}>Included</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.framedBox,
              selectedForfait === 'illimited' ? styles.selectedBox : {},
            ]}
            onPress={() => handleForfaitSelection('illimited')}
          >
            <Text style={styles.titleAdditionInfo}>Illimited kilometers</Text>
            <Text style={styles.smallInfo}>Travel without limits</Text>
            <Text style={styles.price}>+ 50 kr</Text>
          </TouchableOpacity>

          

          {/* Insurance Option */}
          <Text style={styles.carBrand}>Insurance Option:</Text>

          <TouchableOpacity
            style={[
              styles.framedBox,
              selectedInsurance === 'basic' ? styles.selectedBox : {},
            ]}
            onPress={() => handleInsuranceSelection('basic')}
          >
            <Text style={styles.titleAdditionInfo}>Basic Insurance</Text>
            <Text style={styles.smallInfo}>
              Covers vehicle damage and liability.
            </Text>
            <Text style={styles.price}>Included</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.framedBox,
              selectedInsurance === 'premium' ? styles.selectedBox : {},
            ]}
            onPress={() => handleInsuranceSelection('premium')}
          >
            <Text style={styles.titleAdditionInfo}>Premium Insurance</Text>
            <Text style={styles.smallInfo}>
              Full coverage with reduced liability.
            </Text>
            <Text style={styles.price}>+ 100 kr</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
      <View style={styles.bottomContent}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.carPrice}>{carData.price} kr</Text>
            <Text style={styles.carPricePerDay}>{carData.price} kr per day</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.rentButton}>
          <Text style={styles.rentButtonText}>RENT NOW</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    carCard: {
      flex: 1,
      borderRadius: 10,
      height: "100%",
      width: '100%',
      backgroundColor: 'white',
      marginBottom: 100,
    },
    tagContainer: {
      flexDirection: "row",
      marginTop: 10,
    },
    tagText: {
      backgroundColor: colors.cardBackground,
      color: colors.secondaryText,
      padding: 10,
      borderRadius: 10,
      marginRight: 10,
      elevation: 5,
    },
    footnote: {
      textAlign: "center",
      fontSize: 12,
      marginTop: 80,
      marginBottom: 20,
    },
    carImage: {
      width: '90%',
      height: 200,
      alignSelf: 'center',
    },
    cardContent: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: '#f0f0f0',
    },
    carName: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
    },
    carBrand: {
      fontSize: 18,
      color: colors.accent,
      marginBottom: 15,
      fontWeight: 'bold',
      marginBottom: 10,
    
    },
    carPrice: {
      fontSize: 22,
      color: colors.text,
      fontWeight: 'bold',
    },
    carPricePerDay: {
      fontSize: 12,
      color: colors.secondaryText,
    },
    bottomContent: {
      position: "absolute",
      backgroundColor: colors.cardBackground,
      width: "100%",
      height: 100,
      flexDirection: "row",
      justifyContent: "space-between", // Space between total section and rent button
      alignItems: "center",
      paddingHorizontal: 20, // Add horizontal padding for better spacing
      bottom: 0,
      elevation: 5,
    },
    totalContainer: {
      flexDirection: 'row', // Arrange Total and Price horizontally
      alignItems: 'center', // Center vertically
    },
    totalText: {
      fontSize: 20,
      color: colors.secondaryText,
      fontWeight: 'bold',
      marginRight: 30, 
    },
    priceContainer: {
      alignItems: 'flex-start', // Align the price and price per day to the left
    },   
    rentButton: {
      borderRadius: 10,
      padding: 14,
      backgroundColor: colors.primary,
    },
    rentButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    framedBox: {
      borderWidth: 1,
      borderColor: colors.secondaryText, 
      padding: 10,
      borderRadius: 8,
      marginVertical: 10,
    },
    iconRow: {
      flexDirection: 'row',  
      alignItems: 'center', 
      marginBottom: 10, 
    },
    subtitle: {
      fontSize: 14,
      marginLeft: 8, 
      color: colors.infoText,
    },
    paymentAdditionInfos: {
      padding: 20,
    },
    framedBox: {
      borderWidth: 1,
      borderColor: '#ccc', 
      padding: 10,
      borderRadius: 8,
      marginVertical: 10,
      backgroundColor: '#f0f0f0',
    },
    selectedBox: {
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: '#e0f7ff', 
    },
    titleAdditionInfo: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    smallInfo: {
      fontSize: 12,
      color: '#555',
      marginTop: 5,
    },
    price: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
    },
  });
}
