import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FlatList } from 'react-native';

const FilterButtons = ({
  selectedFilters,
  setSelectedFilters,
  filters,
}) => (
  <View style={styles.filterButtons}>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={filters}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilters[item] ? styles.filterButtonSelected : null,
          ]}
          onPress={() =>
            setSelectedFilters({
              ...selectedFilters,
              [item]: !selectedFilters[item],
            })
          }
        >
          <Text style={{ ...styles.filterButtonText, color: selectedFilters[item] ? "#fff" : "#333" }}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
    />
  </View>
);

const styles = StyleSheet.create({
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "transparent",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 50,
  },
  filterButtonSelected: {
    backgroundColor: "#666",
    borderColor: "#666",
  },
  filterButtonText: {
    fontSize: 16,
  },
});

export default FilterButtons;