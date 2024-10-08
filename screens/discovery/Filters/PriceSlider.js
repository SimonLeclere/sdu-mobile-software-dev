import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useTheme } from '../../../contexts/themeContext';
import { useFilters } from '../../../contexts/filterContext';

export default function PriceSlider({ sliderValues, handleSliderChange }) {

    const { colors } = useTheme();
    const styles = getStyles(colors);

    const { selectedFilters } = useFilters();

    return (
        <>
            <Text style={styles.categoryLabel}>Price per day</Text>
            <View style={styles.priceInputs}>
                <Text style={styles.price}>{sliderValues[0]} dkk</Text>
                <Text style={styles.price}>{sliderValues[1]} dkk</Text>
            </View>

            <View style={styles.multiSliderContainer}>
                <MultiSlider
                    values={sliderValues}
                    min={0}
                    max={selectedFilters.maxPrice}
                    step={50}
                    sliderLength={300}
                    onValuesChange={handleSliderChange}
                    selectedStyle={styles.selectedStyle}
                    unselectedStyle={styles.unselectedStyle}
                    markerStyle={styles.markerStyle}
                    snapped={true}
                    trackStyle={styles.trackStyle}
                    markerOffsetY={2}
                />
            </View>
        </>
    );
}

const getStyles = (colors) => {
    return StyleSheet.create({
        categoryLabel: {
            fontSize: 16,
            color: colors.tertiaryText,
            marginTop: 10,
        },
        price: {
            color: colors.text,
        },
        priceInputs: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 5,
        },
        multiSliderContainer: {
            alignItems: 'center',
        },
        markerStyle: {
            backgroundColor: colors.primary,
            width: 20,
            height: 20,
        },
        trackStyle: {
            height: 4,
            borderRadius: 10,
        },
        unselectedStyle: {
            backgroundColor: colors.tertiaryText
        },
        selectedStyle: {
            backgroundColor: colors.primary
        }

    });
};
