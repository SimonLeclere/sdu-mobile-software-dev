import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../contexts/themeContext';

const GiveStars = ({ rating, setRating }) => {
    const { colors } = useTheme(); 
    const styles = getStyles(colors);

    const handlePress = (star) => {
        if (setRating) {
            setRating(star); // Only allow setting rating if setRating is provided (not disabled)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => handlePress(star)}>
                        <FontAwesome
                            name={star <= rating ? 'star' : 'star-o'}
                            size={28}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const getStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.secondaryText,
            marginBottom: 5,
        },
        stars: {
            flexDirection: 'row',
        },
    });
};

export default GiveStars;
