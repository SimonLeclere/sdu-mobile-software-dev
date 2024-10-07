import { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

export default function SignupScreen() {
  const { colors, switchTheme, theme } = useTheme();
  
  const styles = getStyles(colors)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSignUp = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.signup}>Sign up</Text>
        <TouchableOpacity style={styles.arrow}>
          <ArrowLeftIcon size={25} color="black" />
        </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="default"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        keyboardType="numeric"
        autoCapitalize="none"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        keyboardType="default"
        autoCapitalize="words"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat password"
        secureTextEntry
        value={repPassword}
        onChangeText={setRepPassword}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function getStyles (colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signup: {
      color: colors.accent,
      fontSize: 32,
      fontWeight: 'bold',
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    signupButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 5,
      marginTop: 20,
    },
    signupText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
    arrow: {
      position: 'absolute',
      top: 100,
      left: 10,
      padding: 10,
    },
  });
}