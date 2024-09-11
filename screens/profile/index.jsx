import { View, Button, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/themeContext';

export default function ProfileScreen() {
  const { isColorful, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text>The current theme is {isColorful ? 'colorful' : 'monochrome'}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
