import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SunIcon, MoonIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';

const image = require ('../../assets/profilepic.jpg') 


export default function ProfileScreen() {
  const { isColorful, toggleTheme } = useTheme();
  const styles = getStyles(isColorful)

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.themeButton} onPress = {toggleTheme}>
        {
        isColorful ? <MoonIcon size={35} color="white" style={styles.inputIcon} /> : <SunIcon size={35} color="gray" style={styles.inputIcon} />
        }
      </TouchableOpacity>
      <View style = {styles.profileContainer}>
        <Image source={image} style={styles.profilepic} width = {30} height = {30}></Image>
        <Text style={styles.profileName}>Jasper Buijnink</Text>
      </View>
      <View style={styles.pointsContainer}>
        <StarIcon size={25} color='purple' />
        <Text style={styles.pointsText}>30 points!</Text>
      </View>

    </SafeAreaView>
  );
}

function getStyles (isColorful) {
  return StyleSheet.create({
    container: {
      backgroundColor: isColorful ?  'pink' : 'white',
      flex: 1,

    },

    themeButton: {
      alignSelf: 'flex-end',
      padding: 20,
    },

    profileContainer: {
      alignItems: 'center',
      // backgroundColor: 'lightblue',
      marginBottom: 10,
      gap: 10
    },

    profilepic: {
      width: 130,
      height: 130,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: isColorful ? 'white' : 'black',
    },

    profileName: {
      fontSize: 20
    },

    pointsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center', // Center items vertically
      backgroundColor: 'lightblue',
      padding: 5, // Optional: Add padding to ensure proper spacing
    },

    pointsText: {
      fontSize: 18, // Adjust the font size if needed
      marginLeft: 5, // Adds spacing between the icon and the text
    },
    
    


  });
  
}