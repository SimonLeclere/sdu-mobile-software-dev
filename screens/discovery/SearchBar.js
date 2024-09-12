import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native';
import { MagnifyingGlassIcon, ArrowLeftIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../contexts/themeContext';
import DateInput from './DateInput'; // Assurez-vous de bien mettre le chemin d'importation correct
import dayjs from 'dayjs';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const { isColorful } = useTheme();
  const styles = getStyles(isColorful);

  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs().add(1, 'day'));

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Check if the date range is valid
  const isDateRangeValid = fromDate.isBefore(toDate);
  const daysBetween = toDate.diff(fromDate, 'day');
  

  return (
    <View>
      {/* Search bar */}
      <TouchableOpacity onPress={openModal} style={styles.searchBar}>
        <View style={styles.searchIconContainer}>
          <MagnifyingGlassIcon size={25} color="gray" />
        </View>
        
        <View>
          <Text style={styles.searchTextLocation}>{location || 'Anywhere'}</Text>
          <Text style={styles.searchTextDates}>
            {fromDate.format('DD MMM')} - {toDate.format('DD MMM')} ({daysBetween > 1 ? `${daysBetween} days` : `${daysBetween} day`})
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.backdrop} onPress={closeModal}>
          <Pressable style={styles.modalView} onStartShouldSetResponder={() => true}>
            <TouchableOpacity onPress={closeModal} style={styles.backButton}>
              <ArrowLeftIcon size={25} color="black" />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <MapPinIcon size={25} color="gray" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <View style={styles.datesInputsContainer}>
              <DateInput
                label="From"
                value={fromDate}
                onChange={setFromDate}
              />
              <DateInput
                label="To"
                value={toDate}
                onChange={setToDate}
              />
            </View>

            <Pressable
              style={[styles.searchButton, { backgroundColor: isDateRangeValid ? (isColorful ? '#669bbc' : '#000') : 'gray' }]}
              onPress={isDateRangeValid ? closeModal : undefined}
              disabled={!isDateRangeValid}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const getStyles = (isColorful) => {
  return StyleSheet.create({
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    searchIconContainer: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchTextLocation: {
      fontSize: 16,
      color: '#000',
    },
    searchTextDates: {
      fontSize: 14,
      color: 'gray',
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
      color: 'white',
      fontWeight: 'bold',
    },
  });
};

export default SearchBar;
