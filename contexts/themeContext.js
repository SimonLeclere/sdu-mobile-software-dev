import React, { createContext, useState, useContext, ReactNode } from 'react';

const themeList = {
  light: {
    primary:  '#21B0FE',
    secondary: '#FED700',
    accent: '#FE218B',
    background: '#fdf0d5',
    cardBackground: 'white',
    text: 'black',
    secondaryText: 'lightgray'
  },
  dark: {
    primary:  '#21B0FE',
    secondary: '#FED700',
    accent: '#FE218B',
    background: '#181818',
    cardBackground: '#1f1f1f',
    text: 'white',
    secondaryText: 'lightgray'
  },
  colorful: {
    primary:  '#21B0FE',
    secondary: '#FED700',
    accent: '#FE218B',
    background: 'black',
    text: 'white',
    secondaryText: 'lightgray'
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
