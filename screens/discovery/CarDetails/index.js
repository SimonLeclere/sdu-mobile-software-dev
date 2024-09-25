import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';

import { getCarById } from '../../../api/cars';

export default function CarDetails({ route, navigation }) {

  const { carId } = route.params;
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <View
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
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.carPrice}>{carData.price} kr / day</Text>
        <TouchableOpacity style={styles.rentButton}>
          <Text style={styles.rentButtonText}>RENT NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carCard: {
    flex: 1,
    borderRadius: 10,
    height: "100%",
    marginTop: 5,
    width: '100%',
    
  },
  tagContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  tagText: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    elevation: 5
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
  },

  carName: {
    fontSize: 28,
    fontWeight: "bold",
  },
  carBrand: {
    fontSize: 20,
    color: "#666",
    marginBottom: 15
  },
  carPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: "black",
  },
  bottomContent: {
    position: "absolute",
    backgroundColor: "white",
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
    backgroundColor: "#007BFF"
  },
  rentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});