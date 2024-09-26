import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../../contexts/themeContext';

import { getCarById } from '../../../api/cars';

export default function CarDetails({ route, navigation }) {

  const { carId } = route.params;
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colors } = useTheme()
  const styles = getStyles(colors)

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
          <Text style={styles.subtitle}>Transmission type: {carData.transmission}</Text>
          <Text style={styles.subtitle}>Fuel Type: {carData.fuelType}</Text>
          <Text style={styles.subtitle}>Seating Capacity: {carData.seatingCapacity}</Text>

          <View style={styles.tagContainer}>
            {carData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.footnote}>
            When renting a vehicle, it’s important to understand your insurance coverage. Our rental cars come with basic insurance included, which protects you against damage to the vehicle and liability for injuries to others.We recommend checking your personal auto insurance policy and credit card benefits, as they may offer additional coverage during your rental period. If you have questions or need assistance, our customer service team is here to help!
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContent}>
        <Text style={styles.carPrice}>{carData.price} kr / day</Text>
        <TouchableOpacity style={styles.rentButton}>
          <Text style={styles.rentButtonText}>RENT NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getStyles ( colors ) {
  return StyleSheet.create({
  container: {
    flex: 1,
  },  
  carCard: {
    flex: 1,
    borderRadius: 10,
    height: "100%",
    width: '100%',
    backgroundColor: colors.background,
    marginBottom: 100,
  },
  tagContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  tagText: {
    backgroundColor: colors.cardBackground,
    color: colors.secondaryText,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    elevation: 5
  },
  footnote: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 80,
    marginBottom: 20
  },  
  carImage: {
    width: "100%",
    height: 250,
    // borderRadius: 10,
    // backgroundColor: 'white',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.infoText
  },

  carName: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text
  },
  carBrand: {
    fontSize: 20,
    color: colors.secondaryText,
    marginBottom: 15
  },
  carPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: colors.text,
  },
  bottomContent: {
    position: "absolute",
    backgroundColor: colors.cardBackground,
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    elevation: 5,
  },
  rentButton: {
    borderRadius: 10,
    padding: 14,
    backgroundColor: colors.primary
  },
  rentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

}
  )};