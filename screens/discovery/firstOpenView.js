import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import DateTimePicker from 'react-native-ui-datepicker';
import { MapPinIcon } from 'react-native-heroicons/outline';
import useLocationAutoComplete from '../../hooks/useLocationAutoComplete';

export default function FirstOpenView({
    dateRange,
    setDateRange,

    locationQuery,
    setLocationQuery,

    setFirstOpen,
    animateToRegion,
}) {
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const scrollViewRef = useRef(null);

    const screenWidth = Dimensions.get('window').width;

    const { suggestions, loading, error } = useLocationAutoComplete(locationQuery);

    const handleContinuePress = () => {
        if (!dateRange[0]) return;
        if (!dateRange[1]) {
            setDateRange((prevRange) => [prevRange.startDate, prevRange.startDate.add(1, 'day')]);
        }
        // Scroll to the second page
        scrollViewRef.current?.scrollTo({ x: screenWidth, animated: true });
    };

    const handleSuggestionPress = (suggestion) => {
        setLocationQuery(suggestion.display_place || suggestion.display_name);
        setSelectedSuggestion(suggestion);
        setIsInputFocused(false);
    };

    const handleConfirmPress = () => {
        if (!selectedSuggestion) return;
        if (!dateRange[0] || !dateRange[1]) return;
        setFirstOpen(false);

        const latitude = parseFloat(selectedSuggestion.lat);
        const longitude = parseFloat(selectedSuggestion.lon);
        const latitudeDelta = parseFloat(selectedSuggestion.boundingbox[0]) - parseFloat(selectedSuggestion.boundingbox[1]);
        const longitudeDelta = parseFloat(selectedSuggestion.boundingbox[2]) - parseFloat(selectedSuggestion.boundingbox[3]);

        animateToRegion({
            latitude,
            longitude,
            latitudeDelta: Math.abs(latitudeDelta),
            longitudeDelta: Math.abs(longitudeDelta),
        });
    };

    return (
        <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps={'always'}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}  // Disable manual scrolling
            style={styles.scrollView}
        >
            {/* First View */}
            <View style={[styles.page, { width: screenWidth }]}>
                <Text style={styles.title}>Plan your trip</Text>
                <View style={styles.dateInputContainer}>
                    <DateTimePicker
                        mode="range"
                        
                        calendarTextStyle={styles.calendarTextStyle}
                        headerTextStyle={styles.headerTextStyle}
                        headerButtonColor={colors.text}
                        weekDaysTextStyle={styles.calendarTextStyle}
                        selectedItemColor={colors.accent}
                        
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        
                        onChange={(params) => {
                            setDateRange([params.startDate, params.endDate]);
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleContinuePress}>
                    <Text
                        style={styles.buttonText}
                    >Continue</Text>
                </TouchableOpacity>
            </View>

            {/* Second View */}
            <View style={[styles.page, { width: screenWidth }]}>
                <Text style={styles.title}>Select a location</Text>

                <View style={styles.inputContainer}>
                    <MapPinIcon size={25} color={colors.accent} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter location"
                        placeholderTextColor={'white'}
                        value={locationQuery}
                        onChangeText={(text) => {
                            setLocationQuery(text);
                            setSelectedSuggestion(null);
                        }}
                        onFocus={() => setIsInputFocused(true)}
                    />
                    {loading && (
                        <ActivityIndicator size="small" color={colors.accent} />
                    )}
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{JSON.stringify(error)}</Text>
                    </View>
                )}

                {isInputFocused && !loading && suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        <FlatList
                            data={suggestions}
                            keyboardShouldPersistTaps="handled"
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSuggestionPress(item)}>
                                    <Text style={styles.suggestionText}>{item.display_name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                <View>
                    <TouchableOpacity style={styles.button} onPress={handleConfirmPress}>
                        <Text
                            style={styles.buttonText}
                        >Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            setIsInputFocused(false);
                            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
                        }}
                    >
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const getStyles = (colors) => StyleSheet.create({
    scrollView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
    },
    page: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: colors.primary,
    },
    title: {
        color: "white",
        fontSize: 70,
        fontFamily: 'quebecks',
        lineHeight: 70,
        textAlign: 'left',
        marginTop: 80,
    },
    dateInputContainer: {
        marginTop: 40,
        backgroundColor: colors.cardBackground,
        borderRadius: 20,
        padding: 20,
    },
    calendarTextStyle: {
        color: colors.text,
    },
    headerTextStyle: {
        color: colors.text,
    },
    button: {
        marginTop: 40,
        backgroundColor: colors.cardBackground,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.text,
    },
    backButton: {
        marginTop: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    backButtonText: {
        color: "white",
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white'
    },
    loadingContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    errorContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    suggestionsContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        maxHeight: 300,
        zIndex: 10,
        elevation: 5,
        paddingHorizontal: 10,
    },
    suggestionItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    suggestionText: {
        fontSize: 16,
    },
});
