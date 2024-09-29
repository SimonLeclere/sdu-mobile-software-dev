import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/themeContext';

export default function VehicleTypeGrid({ vehicleTypes, selectedVehicleTypes, toggleVehicleType, isSelected }) {

    const { colors } = useTheme();
    const styles = getStyles(colors);

    return (
        <View style={styles.grid}>
            {Object.keys(vehicleTypes).map((type, index) => {
                const IconComponent = vehicleTypes[type];
                const selected = isSelected(type);

                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.gridItem,
                            selected && styles.gridItemSelected,
                        ]}
                        onPress={() => toggleVehicleType(type)}
                    >
                        {
                            IconComponent && (
                                <View style={styles.iconContainer}>
                                    <IconComponent width={80} height={80} />
                                </View>
                            )

                        }
                        <Text style={styles.gridItemText}>{type}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const getStyles = (colors) => {
    return StyleSheet.create({
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      gridItem: {
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 8,
        width: '30%',
        marginBottom: 10,
        alignItems: 'center',
        borderColor: 'transparent',
        borderWidth: 2,
      },
      gridItemSelected: {
        borderColor: colors.primary,
        borderWidth: 2,
      },
      iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      gridItemText: {
        fontSize: 14,
        color: colors.tertiaryText,
        textAlign: 'center',
        overflow: 'hidden',
        flexShrink: 1,
      },
    });
  };
  