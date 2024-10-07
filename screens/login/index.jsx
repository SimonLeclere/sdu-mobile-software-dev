import { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { colors, switchTheme, theme } = useTheme();
  const styles = getStyles(colors)
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, loginGuest} = useAuth();

  const handleLogin = () => {
    login(email, password);
  };

  const handleLoginGuest = () => {
    loginGuest();
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.login} source={require('./../../assets/carrie_white.png')} />

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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up for an Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleLoginGuest}>
        <Text style={styles.signUpText}>Continue as guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function getStyles (colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    login: {
      width: 200,
      height: 200,
      resizeMode: 'contain'
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
    loginButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 5,
      marginTop: 20,
    },
    loginText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
    signUpButton: {
      marginTop: 15,
    },
    signUpText: {
      color: colors.primary,
      fontSize: 16,
    },
  });
}