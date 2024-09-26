import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, StatusBar, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { MagnifyingGlassIcon, ArrowLeftIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../contexts/themeContext';
import DateInput from './DateInput';
import dayjs from 'dayjs';
import useLocationAutoComplete from '../../hooks/useLocationAutoComplete';

const SearchBar = ({ locationQuery, setLocationQuery, animateToRegion }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs().add(1, 'day'));

  const [isInputFocused, setIsInputFocused] = useState(false);

  const { suggestions, loading, error } = useLocationAutoComplete(query);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const isDateRangeValid = fromDate.isBefore(toDate);
  const daysBetween = toDate.diff(fromDate, 'day');

  const handleSuggestionPress = (suggestion) => {
    setLocationQuery(suggestion.display_place || suggestion.display_name);
    setQuery(suggestion.display_name);
    setSelectedSuggestion(suggestion);
    setIsInputFocused(false);
  };

  const handleConfirmPress = () => {
    if (!isDateRangeValid) return;

    if (selectedSuggestion) {
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
    }

    if (locationQuery !== selectedSuggestion.display_place) {
      setLocationQuery(selectedSuggestion.display_place);
    }

    closeModal();
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={openModal} style={styles.searchBar}>
        <View style={styles.searchIconContainer}>
          <MagnifyingGlassIcon size={25} color={colors.accent} />
        </View>
        <View>
          <Text style={styles.searchTextLocation}>{locationQuery || 'Anywhere'}</Text>
          <Text style={styles.searchTextDates}>
            {fromDate.format('DD MMM')} - {toDate.format('DD MMM')} ({daysBetween > 1 ? `${daysBetween} days` : `${daysBetween} day`})
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.backdrop} onPress={closeModal}>
          <Pressable style={styles.modalView} onStartShouldSetResponder={() => true}>
            <TouchableOpacity onPress={closeModal} style={styles.backButton}>
              <ArrowLeftIcon size={25} color="black" />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <MapPinIcon size={25} color={colors.accent} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={query}
                onChangeText={(text) => {
                  setQuery(text);
                  setSelectedSuggestion(null);
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              {loading && (
                  <ActivityIndicator size="small" color="#fe218b" />
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

            <View style={styles.datesInputsContainer}>
              <DateInput label="From" value={fromDate} onChange={setFromDate} />
              <DateInput label="To" value={toDate} onChange={setToDate} />
            </View>

            <Pressable
              style={[styles.searchButton, { backgroundColor: isDateRangeValid && selectedSuggestion !== null ? colors.primary : 'gray' }]}
              onPress={handleConfirmPress}
              disabled={!isDateRangeValid || selectedSuggestion === null}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const getStyles = (colors) => {
  return StyleSheet.create({
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      elevation: 5,
      overflow: 'hidden',
    },
    searchIconContainer: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchTextLocation: {
      fontSize: 16,
      color: colors.text,
    },
    searchTextDates: {
      fontSize: 14,
      color: colors.timeLocationText,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    modalView: {
      marginTop: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '95%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    backButton: {
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
    },
    loadingContainer: {
      marginVertical: 10,
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: 'gray',
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
      position: 'absolute',
      top: 120, // Adjust this value to position below the input
      left: 10,
      right: 10,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      maxHeight: 150,
      zIndex: 10,
      elevation: 5,
    },
    suggestionItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    suggestionText: {
      fontSize: 16,
    },
    datesInputsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      gap: 10,
    },
    searchButton: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    searchButtonText: {
      color: colors.text,
      fontWeight: 'bold',
    },
  });
};

export default SearchBar;
