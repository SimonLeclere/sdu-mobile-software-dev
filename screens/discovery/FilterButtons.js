import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const FilterButtons = ({
  selectedFilters,
  setSelectedFilters,
  filters,
}) => {
  const [showGradient, setShowGradient] = useState(true);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const contentWidth = event.nativeEvent.contentSize.width;
    const scrollWidth = event.nativeEvent.layoutMeasurement.width;
    const scrollOffset = event.nativeEvent.contentOffset.x;

    // Check if the user has scrolled to the end
    if (scrollOffset + scrollWidth >= contentWidth - 10) {
      setShowGradient(false);
    } else {
      setShowGradient(true);
    }
  };

  return (
    <View style={styles.filterButtons}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filters}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
      {showGradient && (
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(240,240,240,1)']}
          start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
          locations={[0.8, 1]}
          style={styles.gradient}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default FilterButtons;
