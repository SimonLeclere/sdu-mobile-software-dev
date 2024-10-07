import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { formatDate } from './BookedCarCard';
import GiveStars from './giveStars'; // Ensure this path is correct

const PastBookingDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [opinion, setOpinion] = useState(''); // State for storing user opinion
  const [rating, setRating] = useState(0); // State for star rating
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

  // Handle the submission of feedback
  const handleSubmitFeedback = () => {
    const feedback = {
      rating,
      opinion,
    };
    console.log('User feedback:', feedback); // Replace with actual logic to save feedback
    setIsSubmitted(true); // Set submission state
  };

  return (
    <ScrollView style={styles.container}>
      {/* Display the image of the car */}
      <Image source={item.image} style={styles.carImage} />

      {/* Display car details */}
      <Text style={styles.carName}>{item.modelName}</Text>
      <Text style={styles.carBrand}>{item.brandName}</Text>

      {/* Display booking dates */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Booking Dates:</Text>
        <Text style={styles.infoText}>From: {formatDate(item.fromDate)}</Text>
        <Text style={styles.infoText}>To: {formatDate(item.toDate)}</Text>
      </View>

      {/* Display location */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Where?</Text>
        <Text style={styles.infoText}>{item.exactAddress}</Text>
      </View>

      {/* Star rating and opinion container */}
      {isSubmitted ? (
        <View style={styles.feedbackContainer}>
          <Text style={styles.label}>Your opinion</Text>
          <GiveStars rating={rating} setRating={null} /> 
          <Text style={styles.opinionText}>{opinion || "No opinion provided."}</Text> 
        </View>
      ) : (
        <View>
          <GiveStars rating={rating} setRating={isSubmitted ? null : setRating} />
          <View style={styles.feedbackInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Leave your opinion here..."
              placeholderTextColor={colors.secondaryText}
              value={opinion}
              onChangeText={isSubmitted ? null : setOpinion}
              multiline
            />
          </View>
        </View>
      )}

      {/* Submit button */}
      <TouchableOpacity
        style={[styles.submitButton, isSubmitted && { backgroundColor: 'pink' }]}
        onPress={handleSubmitFeedback}
        disabled={isSubmitted}
      >
        <Text style={styles.submitButtonText}>{isSubmitted ? 'Feedback Submitted' : 'Submit Feedback'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  carImage: {
    width: '80%',
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  carBrand: {
    fontSize: 18,
    color: colors.secondaryText,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  infoContainer: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
  },
  feedbackContainer: {
    marginBottom: 20,
    backgroundColor: 'white', // Add white background
    padding: 10,
    borderRadius: 10,
  },
  opinionText: {
    marginTop: 10,
    color: colors.text,
  },
  feedbackInputContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    color: colors.text,
    backgroundColor: colors.inputBackground,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PastBookingDetailsScreen;
