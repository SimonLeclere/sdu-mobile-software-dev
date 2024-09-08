import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";

const CarCard = ({ item }) => (
  <View style={styles.carCard}>
    <Image source={item.image} style={styles.carImage} />
    <View style={styles.cardContent}>
      <Text style={styles.carName}>{item.modelName}</Text>
      <Text style={styles.carBrand}>{item.brandName}</Text>
      <View style={styles.bottomContent}>
        <Text style={styles.carPrice}>{item.price} kr / day</Text>
        <ArrowRightIcon size={20} color="#666" />
      </View>
    </View>
  </View>
);

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


export default CarCard;