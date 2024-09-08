import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiscoveryScreen from './screens/discovery';
import ProfileScreen from './screens/profile';
import CarDetails from './screens/discovery/CarDetails/index';

import { GlobeAltIcon, UserIcon } from "react-native-heroicons/outline";

const tabIcons = {
  Discovery: GlobeAltIcon,
  Profile: UserIcon,
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const Icon =
            tabIcons[route.name] || DiscoveryIcon;
          return <Icon color={color} size={size} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Discovery" component={DiscoveryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Here we nest the HomeTabs navigator inside the Stack navigator
// This way we can navigate to the CarDetails screen from the Discovery screen without showing the tabs
// see https://reactnavigation.org/docs/hiding-tabbar-in-screens 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Car Details'
          }}
          name="CarDetails"
          component={CarDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             const Icon =
//               tabIcons[route.name] || DiscoveryIcon;
//             return <Icon color={color} size={size} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//           headerShown: false
//         })}
//       >
//         <Tab.Screen name="Discovery" component={DiscoveryScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }