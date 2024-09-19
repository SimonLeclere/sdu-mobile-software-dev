import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../contexts/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SunIcon, MoonIcon, HomeIcon, PhoneIcon, EnvelopeIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';

const image = require ('../../assets/DonaldDuckProfilePic.png') 


export default function ProfileScreen() {
  const { colors, switchTheme, theme } = useTheme();
  console.log(theme, colors)
  const styles = getStyles(colors)

  let themeIcon
  switch (theme) {
    case 'light': 
      themeIcon = <MoonIcon size={35} color="gray" style={styles.inputIcon} />
      break;
    case 'dark':
      themeIcon = <SunIcon size={35} color="gray" style={styles.inputIcon} />
      break;
    default: 
      themeIcon = <MoonIcon size={35} color="gray" style={styles.inputIcon} />
      break;

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.profileAndThemeContainer}>
        <Text style={styles.profile}>Profile</Text>
      <TouchableOpacity style={styles.themeButton} onPress = {() => {
        if (theme == 'light') {
          switchTheme('dark')
        } else {
        switchTheme('light')
      }
      }}>
          {themeIcon}
        </TouchableOpacity>
      </View>
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
          <Text style={styles.infoTextPrimary}>Address:</Text>
          <Text style={styles.infoTextSecondary}>156 Rusty Ln{"\n"} Waxahachie{"\n"} Texas 75165</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <PhoneIcon size={30} color='gray' style={styles.infoIcon} />
        <View>
          <Text style={styles.infoTextPrimary}>Phone Number:</Text>
          <Text style={styles.infoTextSecondary}>1-877-7-MICKEY</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <EnvelopeIcon size={30} color='gray' style={styles.infoIcon} />
        <View>
          <Text style = {styles.infoTextPrimary}>E-mail:</Text>
          <Text style={styles.infoTextSecondary}>donald.duck@disney.com</Text>
        </View>
      </View>
      


    </SafeAreaView>
  );
}

function getStyles (colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,

    },

    profileAndThemeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },

    profile: {
      color: colors.text,
      fontSize: 32,
      fontWeight: 'bold',
    },

    themeButton: {
      alignSelf: 'center',
    },

    profileContainer: {
      alignItems: 'center',
      marginBottom: 5,
      gap: 10
    },

    profilepic: {
      width: 130,
      height: 130,
      borderRadius: 100,
      // borderWidth: 4,
      // borderColor: isColorful ? 'white' : 'black',
    },

    profileName: {
      color: colors.text,
      fontSize: 20
    },

    pointsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center', // Center items vertically
      padding: 5, // Optional: Add padding to ensure proper spacing,
      gap: 5,
      marginBottom: 20
    },

    pointsText: {
      color: colors.text,
      fontSize: 18, // Adjust the font size if needed
    },
    
    infoContainer: {
      borderRadius: 20,
      padding: 15,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 20,
      flexDirection: 'row',
      gap: 10,
      backgroundColor: colors.cardBackground
    },

    infoIcon: {
      alignSelf: 'center'
    },

    infoTextPrimary: {
      fontWeight: 'bold',
      color: colors.text
    },

    infoTextSecondary: {
      color: colors.text
    }




  });
  
}