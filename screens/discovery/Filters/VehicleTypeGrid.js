import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/themeContext';

export default function VehicleTypeGrid({ vehicleTypes, selectedVehicleTypes, toggleVehicleType, isSelected }) {

    const { isColorful } = useTheme();
    const styles = getStyles(isColorful);

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

const getStyles = (isColorful) => {

    if (isColorful) {

        return StyleSheet.create({
            grid: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: 10
            },
            gridItem: {
                backgroundColor: '#f0f0f0',
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 8,
                width: '30%',
                marginBottom: 10,
                alignItems: 'center',
                borderColor: 'transparent',
                borderWidth: 2
            },
            gridItemSelected: {
                borderColor: '#669bbc',
                borderWidth: 2
            },
            iconContainer: {
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            },
            gridItemText: {
                fontSize: 14,
                color: '#333',
                textAlign: 'center',
                overflow: 'hidden',
                flexShrink: 1
            }
        });

    }

    return StyleSheet.create({
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 10
        },
        gridItem: {
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 8,
            width: '30%',
            marginBottom: 10,
            alignItems: 'center',
            borderColor: 'transparent',
            borderWidth: 2
        },
        gridItemSelected: {
            borderColor: '#007bff',
            borderWidth: 2
        },
        iconContainer: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
        },
        gridItemText: {
            fontSize: 14,
            color: '#333',
            textAlign: 'center',
            overflow: 'hidden',
            flexShrink: 1
        }
    });

};