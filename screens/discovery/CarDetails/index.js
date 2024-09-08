import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CarDetails() {
  return (
    <View style={styles.container}>
        <Text>Car Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingTop: 40,
    flex: 1,
    gap: 10,
  },
});