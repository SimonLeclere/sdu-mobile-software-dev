import React, { createContext, useState, useContext } from 'react';
import { SunIcon, MoonIcon, SwatchIcon } from "react-native-heroicons/outline";


const themeList = {
  light: {
    icon: SunIcon,
    markerIcon: require('../assets/marker.png'),
    mapStyle: undefined,
    primary:  '#21B0FE',
    secondary: '#FED700',
    accent: '#FE218B',
    background: '#fdf0d5',
    cardBackground: 'white',
    filterBackground: 'white',
    text: 'black',
    secondaryText: '#666',
    tertiaryText: '#333',
    infoText:'#555',
    timeLocationText: '#888',
    tabBar: "white",
    statusBarStyle: 'dark'
  },
  dark: {
    icon: MoonIcon,
    markerIcon: require('../assets/marker-dark.png'),
    mapStyle: require('../assets/mapstyle-dark.json'),
    primary:  '#21B0FE',
    secondary: '#FED700',
    accent: '#FE218B',
    background: '#181818',
    cardBackground: '#1f1f1f',
    filterBackground: '#1f1f1f',
    text: 'white',
    secondaryText: '#666',
    tertiaryText: '#333',
    infoText: '#555',
    timeLocationText: '#888',
    tabBar: '#1f1f1f',
    statusBarStyle: 'light'
  },
  colorful: {
    icon: SwatchIcon,
    markerIcon: require('../assets/marker.png'),
    mapStyle: null,
    primary:  '#21B0FE',
    secondary: '#FED700',
    accent: '#FE218B',
    background: '#fdf0d5',
    cardBackground: 'white',
    filterBackground: 'white',
    text: 'black',
    secondaryText: '#666',
    tertiaryText: '#333',
    infoText: '#555',
    timeLocationText: '#888',
    tabBar: "white",
    statusBarStyle: 'dark'
  }
}

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const switchTheme = (themeName) => {
    if (themeList[themeName]) {
      setTheme(themeName)
    }
  };

  // Convert children to a function if it's a function
  const renderChildren = typeof children === 'function' ? children({ colors: themeList[theme], switchTheme, theme, themes: themeList }) : children;

  return (
    <ThemeContext.Provider value={{ colors: themeList[theme], switchTheme, theme, themes: themeList }}>
      {renderChildren}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
