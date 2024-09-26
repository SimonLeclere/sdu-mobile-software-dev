import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/themeContext";

const CarCard = ({ item }) => {
  const navigation = useNavigation();

  const { colors } = useTheme();
  const styles = getStyles(colors);

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

const getStyles = (colors) => {
  return StyleSheet.create({
    carCard: {
      backgroundColor: colors.cardBackground,
      padding: 10,
      borderRadius: 10,
      elevation: 5,
      marginBottom: 20,
      marginTop: 5,
      width: '46%', // Chaque carte prendra 45% de la largeur disponible
      marginHorizontal: '2%', // Ajoute un espacement horizontal entre les cartes
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
      color: colors.primary, // Changement de couleur selon isColorful
    },
    carBrand: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    carPrice: {
      fontSize: 12,
      color: colors.secondaryText,
    },
    bottomContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    arrowColor: colors.accent, // Changement de couleur selon isColorful
  });
};



export default CarCard;