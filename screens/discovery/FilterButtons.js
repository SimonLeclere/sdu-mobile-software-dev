import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useFilters } from "../../contexts/filterContext";
import { useTheme } from "../../contexts/themeContext";

const FilterButtons = () => {

  const { isColorful } = useTheme();
  const styles = getStyles(isColorful);

  const [showEndGradient, setShowEndGradient] = useState(true);
  const [showStartGradient, setShowStartGradient] = useState(false);

  const { selectedFilters, availableTagFilters, setSelectedFilters } = useFilters();
  

  const flatListRef = useRef(null);

  const navigation = useNavigation();

  const handleScroll = (event) => {
    const contentWidth = event.nativeEvent.contentSize.width;
    const scrollWidth = event.nativeEvent.layoutMeasurement.width;
    const scrollOffset = event.nativeEvent.contentOffset.x;

    // Check if the user has scrolled to the end
    if (scrollOffset + scrollWidth >= contentWidth - 10) {
      setShowEndGradient(false);
    } else {
      setShowEndGradient(true);
    }

    // Check if the user has scrolled to the start
    if (scrollOffset <= 10) {
      setShowStartGradient(false);
    } else {
      setShowStartGradient(true);
    }
  };

  return (
    <View style={styles.filterButtons}>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => navigation.navigate("Filters")}
      >
        <AdjustmentsHorizontalIcon size={24} color="#333" />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={availableTagFilters}
          onScroll={handleScroll}
          scrollEventThrottle={16}
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
              <Text style={{ ...styles.filterButtonText, color: selectedFilters.tagFilter[item] ? "#fff" : "#333" }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
        
        {showStartGradient && (
          <LinearGradient
            colors={styles.gradientColors}

            start={{x: 1, y: 0.75}} end={{x: 0, y: 0.25}}
            locations={[0.8, 1]}
            style={styles.gradient}
          />
        )}
        {showEndGradient && (
          <LinearGradient
            colors={styles.gradientColors}
            start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
            locations={[0.8, 1]}
            style={styles.gradient}
          />
        )}
      </View>

    </View>
  );
};

const getStyles = (isColorful) => {
  return StyleSheet.create({
    filterButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    filterButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginRight: 10,
      backgroundColor: "transparent",
      borderColor: isColorful ? "#333" : "#333",
      borderWidth: 1,
      borderRadius: 50,
    },
    filterButtonSelected: {
      backgroundColor: isColorful ? "#003049" : "#666",
      borderColor: isColorful ? "#003049" : "#666",
    },
    filterButtonText: {
      fontSize: 16,
    },
    gradient: {
      position: 'absolute',
      pointerEvents: 'none',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
    },
    gradientColors: isColorful 
        ? ['rgba(0,0,0,0)', '#fdf0d5'] 
        : ['rgba(0,0,0,0)', 'rgba(240,240,240,1)'],
    }
  )};


export default FilterButtons;
