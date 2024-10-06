import React, { useState, useRef } from "react";
import { TouchableOpacity, Animated, View, StyleSheet } from "react-native";

import { useTheme } from "../../contexts/themeContext";
import { SwatchIcon } from "react-native-heroicons/outline";

const themeSelector = () => {
  const { colors, switchTheme, theme, themes } = useTheme();

  const [showMenu, setShowMenu] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const containerHeight = useRef(new Animated.Value(0)).current;

  const menuItems = Object.entries(themes).map(([name, theme]) => {
    const Icon = theme.icon || SwatchIcon;

    return {
      label: name,
      icon: <Icon size={30} color="gray" />,
      action: () => {
        switchTheme(name)
      },
    };
  });

  const toggleMenu = () => {
    if (showMenu) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(containerHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setShowMenu(false));
    } else {
      setShowMenu(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(containerHeight, {
          toValue: menuItems.length * (25 + 2 * 10), // 45 = 25 (height of menu item) + 2 * 10 (padding)
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const CurrentThemeIcon = colors?.icon || SwatchIcon;

  return (
    <TouchableOpacity onPress={toggleMenu}>
      <View style={styles.menuHeader}>
        <Animated.View>
          {CurrentThemeIcon && <CurrentThemeIcon size={30} color="gray" />}
        </Animated.View>
      </View>

      <Animated.View
        style={[styles.menuContainer, { height: containerHeight }]}
      >
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {showMenu &&
            menuItems
            .filter((item) => item.label !== theme)
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  toggleMenu();
                  item.action();
                }}
              >
                {item.icon}
              </TouchableOpacity>
            ))}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuHeader: {
    padding: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 50,
    alignItems: "center",
    overflow: "hidden",
  },
  menuItem: {
    padding: 10,
    zIndex: 10,
  },
  menuItemText: {
    fontSize: 14,
    color: "white",
    textAlign: "right",
  },
});

export default themeSelector;
