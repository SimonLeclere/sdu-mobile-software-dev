import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useFilters } from "../../contexts/filterContext";
import { useTheme } from "../../contexts/themeContext";

const FilterButtons = () => {

  const { colors } = useTheme();
  const styles = getStyles(colors);

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
          fadingEdgeLength={100}
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
