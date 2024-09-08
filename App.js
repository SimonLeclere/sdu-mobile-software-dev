import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DiscoveryScreen from './screens/discovery';
import ProfileScreen from './screens/profile';

import { GlobeAltIcon, UserIcon } from "react-native-heroicons/outline";

const tabIcons = {
  Discovery: GlobeAltIcon,
  Profile: UserIcon,
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const Icon =
              tabIcons[route.name] || DiscoveryIcon;
            return <Icon color={color} size={size} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Discovery" component={DiscoveryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}