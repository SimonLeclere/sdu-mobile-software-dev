import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const CarCard = ({ item }) => (
  <View style={styles.carCard}>
    <Image source={item.image} style={styles.carImage} />
    <View>
      <Text style={styles.carName}>{item.name}</Text>
      <Text style={styles.carPrice}>{item.price} / Day</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  carCard: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  carImage: {
    width: 80,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  carPrice: {
    fontSize: 14,
    color: "#666",
  },
});

export default CarCard;
