import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useFilters } from "../../contexts/filterContext";
import { useTheme } from "../../contexts/themeContext";

const FilterButtons = () => {

  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { selectedFilters, availableTagFilters, setSelectedFilters, atLeastOneFilterSet } = useFilters();
  
  

  const flatListRef = useRef(null);

  const navigation = useNavigation();

  return (
    <View style={styles.filterButtons}>

      <TouchableOpacity
        style={[
          styles.filterButton,
          atLeastOneFilterSet ? styles.filterButtonSelected : null,
        ]}
        onPress={() => navigation.navigate("Filters")}
      >
        <AdjustmentsHorizontalIcon size={24} color={atLeastOneFilterSet ? colors.text : colors.secondaryText} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
          data={availableTagFilters}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilters.tagFilter[item] ? styles.filterButtonSelected : null,
              ]}
              onPress={() =>
                setSelectedFilters((selectedFilters) => ({
                  ...selectedFilters,
                  tagFilter: {
                    ...selectedFilters.tagFilter,
                    [item]: !selectedFilters.tagFilter[item],
                  },
                }))
              }
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilters.tagFilter[item] ? styles.filterButtonSelectedText : null,
                ]}
              >
              {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

const getStyles = (colors) => {
  return StyleSheet.create({
    filterButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    filterButton: {
      elevation: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginRight: 10,
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBackground,
      borderRadius: 50,
      marginBottom: 5,
    },
    filterButtonSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterButtonText: {
      fontSize: 16,
      color: colors.secondaryText,
    },
    filterButtonSelectedText: {
      fontSize: 16,
      color: colors.text,
    },
  });
}


export default FilterButtons;
