import React, { createContext, useState, useContext, ReactNode } from 'react';

const themeList = {
  light: {
    primary:  '#21B0FE',
    secondary: '#FED700',
    accent: '#FE218B',
    background: '#f2f2f2',
    cardBackground: 'white',
    filterBackground: 'white',
    text: 'black',
    secondaryText: '#333',
    tertiaryText: '#666',
    infoText:'#555',
    timeLocationText: '#888',
    tabBar: "white",
    statusBarStyle: 'dark'
  },
  dark: {
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
  const renderChildren = typeof children === 'function' ? children({ colors: themeList[theme], switchTheme, theme }) : children;

  return (
    <ThemeContext.Provider value={{ colors: themeList[theme], switchTheme, theme }}>
      {renderChildren}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
