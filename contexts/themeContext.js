import React, { createContext, useState, useContext, ReactNode } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isColorful, setIsColorful] = useState(false);

  const toggleTheme = () => {
    setIsColorful(!isColorful);
  };

  // Convert children to a function if it's a function
  const renderChildren = typeof children === 'function' ? children({ isColorful, toggleTheme }) : children;

  return (
    <ThemeContext.Provider value={{ isColorful, toggleTheme }}>
      {renderChildren}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
