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
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => navigation.navigate("CarDetails", { item: carData })}
    >
      <Image source={carData.image} style={styles.carImage} />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{carData.modelName}</Text>
        <Text style={styles.carBrand}>{carData.brandName}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.carPrice}>{carData.price} kr / day</Text>
          <ArrowRightIcon size={20} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  carCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    marginTop: 5,
    width: '45%', // Chaque carte prendra 45% de la largeur disponible
    marginHorizontal: '2.5%', // Ajoute un espacement horizontal entre les cartes
  },
  carImage: {
    width: "100%", // Assure que l'image prend toute la largeur disponible
    height: 90,
    borderRadius: 10,
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  carName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  carBrand: {
    fontSize: 14,
    color: "#666",
  },
  carPrice: {
    fontSize: 12,
    color: "#666",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});