import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFilters } from '../../../contexts/filterContext';
import { useNavigation } from '@react-navigation/native'; // Import navigation

import SelectorWithModal from './SelectorWithModal.js';
import VehicleTypeGrid from './VehicleTypeGrid';
import PriceSlider from './PriceSlider';

const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price (ascending)', value: 'price_asc' },
    { label: 'Price (descending)', value: 'price_desc' },
];

const gearboxOptions = [
    { label: 'All transmissions', value: 'all' },
    { label: 'Automatic', value: 'automatic' },
    { label: 'Manual', value: 'manual' },
];

import CarIcon from '../../../assets/vehiclesIcons/car.jsx';
import UtilityIcon from '../../../assets/vehiclesIcons/utility.jsx';
import SuvIcon from '../../../assets/vehiclesIcons/suv.jsx';
import PickupIcon from '../../../assets/vehiclesIcons/pickup.jsx';
import MinibusIcon from '../../../assets/vehiclesIcons/minibus.jsx';
import MotorcycleIcon from '../../../assets/vehiclesIcons/motorcycle.jsx';
import { useTheme } from '../../../contexts/themeContext.js';

const vehicleTypes = {
    'Cars': CarIcon,
    'SUVs': SuvIcon,
    'Pickups': PickupIcon,
    'Minibuses': MinibusIcon,
    'Utility': UtilityIcon,
    'Motorcycles': MotorcycleIcon,
};

export default function FilterScreen() {
    const { selectedFilters, setSelectedFilters } = useFilters();
    // const [selectedFilters, setSelectedFilters] = useState({
    //     sortBy: 'relevance', // relevance | priceAsc | priceDesc
        
    //     priceRange: [Number.MIN_VALUE, Number.MAX_VALUE],
        
    //     vehicleType: [],
    //     brand: 'all',
    //     gearbox: 'all',
    
    //     tagFilter: {},
    //   });


    const { colors } = useTheme();
    const styles = getStyles(colors);
    const navigation = useNavigation(); // Initialize navigation

    const [minPrice, setMinPrice] = useState(selectedFilters.priceRange[0]);
    const [maxPrice, setMaxPrice] = useState(selectedFilters.priceRange[1]);
    const [sliderValues, setSliderValues] = useState([minPrice, maxPrice]);

    const [selectedVehicleTypes, setSelectedVehicleTypes] = useState(selectedFilters.vehicleType);
    const [sortOrder, setSortOrder] = useState(selectedFilters.sortBy);
    const [brand, setBrand] = useState(selectedFilters.brand);
    const [gearbox, setGearbox] = useState(selectedFilters.gearbox);

    const handleSliderChange = (values) => {
        setSliderValues(values);
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    const toggleVehicleType = (type) => {
        setSelectedVehicleTypes((prevSelected) =>
            prevSelected.includes(type)
                ? prevSelected.filter((item) => item !== type)
                : [...prevSelected, type]
        );
    };

    const isSelected = (type) => selectedVehicleTypes.includes(type);

    const applyFiltersAndNavigate = () => {        

        // Apply the filters to your filter context
        setSelectedFilters((prev) => ({
            ...prev,
            sortBy: sortOrder,
            priceRange: [minPrice, maxPrice],
            vehicleType: selectedVehicleTypes,
            brand,
            gearbox,
        }));

        // Navigate to the "discovery" screen
        navigation.navigate('Discovery');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {/* Sort Order Section */}
                <SelectorWithModal
                    label='Sort by'
                    selectedSortOption={sortOrder}
                    sortOptions={sortOptions}
                    setSortOption={setSortOrder}
                />

                <View style={styles.separator} />

                {/* Price per Day Section */}
                <PriceSlider
                    sliderValues={sliderValues}
                    handleSliderChange={handleSliderChange}
                />

                <View style={styles.separator} />

                <Text style={styles.categoryLabel}>Vehicle type</Text>

                <VehicleTypeGrid
                    vehicleTypes={vehicleTypes}
                    selectedVehicleTypes={selectedVehicleTypes}
                    toggleVehicleType={toggleVehicleType}
                    isSelected={isSelected}
                />

                <View style={styles.separator} />

                <Text style={styles.categoryLabel}>Vehicle attributes</Text>

                <SelectorWithModal
                    label='Brand'
                    selectedSortOption={brand}
                    sortOptions={selectedFilters.brandOptions}
                    setSortOption={setBrand}
                />

                <SelectorWithModal
                    label='Transmission'
                    selectedSortOption={gearbox}
                    sortOptions={gearboxOptions}
                    setSortOption={setGearbox}
                />
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={applyFiltersAndNavigate}>
                <Text style={styles.buttonText}>Display results</Text>
            </TouchableOpacity>
        </View>
    );
}

const getStyles = (colors) => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      scrollContainer: {
        flex: 1,
        paddingHorizontal: 15,
        gap: 10,
      },
      sortSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
      },
      separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 5,
      },
      categoryLabel: {
        fontSize: 16,
        color: colors.tertiaryText,
        marginTop: 10,
      },
      button: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 15,
      },
      buttonText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
  };
  