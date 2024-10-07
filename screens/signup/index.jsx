import { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "../../contexts/themeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function SignupScreen({ navigation }) {
  const { colors } = useTheme();

  const styles = getStyles(colors);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const handleSignUp = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeftIcon size={25} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign up</Text>

      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor={colors.placeholder}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          value={repPassword}
          onChangeText={setRepPassword}
          secureTextEntry={true}
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    arrow: {
      position: "absolute",
      top: 50,
      left: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 30,
    },
    inputContainer: {
      width: '100%',  // Make the input container take the full width of the parent
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 8, // Adds space between rows
    },
    halfInput: {
      width: '48%', // Ensure each input takes half the width in a row
    },
    input: {
      width: '100%',  // Ensure each input takes the full width of the container
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
      color: colors.text,
      borderWidth: 1,  // Add border to the inputs
      borderColor: colors.border,  // Use the dynamic border color from the theme
    },
    signupButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 40,
      marginTop: 20,
    },
    signupText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
};
