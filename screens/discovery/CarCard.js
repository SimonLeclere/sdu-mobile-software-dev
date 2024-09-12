import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/themeContext";

const CarCard = ({ item }) => {
  const navigation = useNavigation();

  const { isColorful } = useTheme();
  const styles = getStyles(isColorful);

  return (
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => navigation.navigate("CarDetails", { carId: item.id })}
    >
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{item.modelName}</Text>
        <Text style={styles.carBrand}>{item.brandName}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.carPrice}>{item.price} kr / day</Text>
          <ArrowRightIcon size={20} color={styles.arrowColor} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (isColorful) => {
  return StyleSheet.create({
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
      color: isColorful ? "#003049" : "#000", // Changement de couleur selon isColorful
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
    arrowColor: isColorful ? "#c1121f" : "#666", // Changement de couleur selon isColorful
  });
};



export default CarCard;