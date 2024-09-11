import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { MagnifyingGlassIcon, XCircleIcon } from 'react-native-heroicons/outline';

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  return (
  <View style={styles.searchBar}>
    <View style={styles.searchIconContainer}>
      <MagnifyingGlassIcon size={20} color="gray" />
    </View>
    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      value={searchQuery}
      onChangeText={(text) => setSearchQuery(text)}
      placeholderTextColor="gray"
    />
    {searchQuery.length > 0 && (
      <View style={styles.clearIconContainer}>
        <XCircleIcon
          size={20}
          color="gray"
          onPress={() => setSearchQuery('')}
        />
      </View>
    )}
  </View>
)};

const styles = StyleSheet.create({
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
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  clearIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
});

export default SearchBar;