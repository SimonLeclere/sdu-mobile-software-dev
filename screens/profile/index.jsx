import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SunIcon, MoonIcon, HomeIcon, PhoneIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';

const image = require ('../../assets/DonaldDuckProfilePic.png') 


export default function ProfileScreen() {
  const { isColorful, toggleTheme } = useTheme();
  const styles = getStyles(isColorful)

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.themeButton} onPress = {toggleTheme}>
          {
          isColorful ? <MoonIcon size={35} color="gray" style={styles.inputIcon} /> : <SunIcon size={35} color="gray" style={styles.inputIcon} />
          }
        </TouchableOpacity>
        <View style = {styles.profileContainer}>
          <Image source={image} style={styles.profilepic} width = {30} height = {30}></Image>
          <Text style={styles.profileName}>Donald Duck</Text>
        </View>
        <View style={styles.pointsContainer}>
          <StarIcon size={25} color='purple' />
          <Text style={styles.pointsText}>30 points!</Text>
        </View>
      <View style={styles.infoContainer}>
        <HomeIcon size={30} color='gray' style={styles.infoIcon} />
        <View>
          <Text style={{ fontWeight: 'bold' }}>Address:</Text>
          <Text style={styles.infoText}>156 Rusty Ln{"\n"} Waxahachie{"\n"} Texas 75165</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <PhoneIcon size={30} color='gray' style={styles.infoIcon} />
        <View>
          <Text style={{ fontWeight: 'bold' }}>Phone Number:</Text>
          <Text style={styles.infoText}>1-877-7-MICKEY</Text>
        </View>
      </View>


    </SafeAreaView>
  );
}

function getStyles (isColorful) {
  return StyleSheet.create({
    container: {
      backgroundColor: isColorful ?  '#fdf0d5' : '#f0f0f0',
      flex: 1,

    },

    themeButton: {
      alignSelf: 'flex-end',
      padding: 20,
    },

    profileContainer: {
      alignItems: 'center',
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
      padding: 5, // Optional: Add padding to ensure proper spacing,
      gap: 5
    },

    pointsText: {
      fontSize: 18, // Adjust the font size if needed
    },
    
    infoContainer: {
      borderRadius: 20,
      elevation: 5,
      padding: 15,
      margin: 15,
      backgroundColor: 'white',
      flexDirection: 'row',
      gap: 10
    },

    infoIcon: {
      alignSelf: 'center'
    },

    infoText: {
      color: '#666'
    }




  });
  
}