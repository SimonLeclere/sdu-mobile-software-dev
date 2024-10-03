import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import DiscoveryScreen from './screens/discovery';
import ProfileScreen from './screens/profile';
import OrdersScreen from './screens/orders';
import PaymentScreen from './screens/discovery/CarDetails/payment/index';
import CarDetails from './screens/discovery/CarDetails/index';
import FilterScreen from './screens/discovery/Filters/index';
import BookingDetailsScreen from './screens/orders/BookingDetailsScreen';
import PastBookingDetailsScreen from './screens/orders/PastBookingDetailsScreen';
import PastBookingsScreen from './screens/orders/PastBookingsScreen';


import { GlobeAltIcon, UserIcon, ShoppingCartIcon } from "react-native-heroicons/outline";

import { FilterProvider, useFilters } from './contexts/filterContext';
import { ThemeProvider, useTheme } from './contexts/themeContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const tabIcons = {
  Discovery: GlobeAltIcon,
  Profile: UserIcon,
  Orders: ShoppingCartIcon
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {

  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const Icon =
            tabIcons[route.name] || DiscoveryIcon;
          return <Icon color={color} size={size} />;
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderColor: colors.tabBarBorder,
        },
      })}
    >
      <Tab.Screen name="Discovery" component={DiscoveryScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Here we nest the HomeTabs navigator inside the Stack navigator
// This way we can navigate to the CarDetails screen from the Discovery screen without showing the tabs
// see https://reactnavigation.org/docs/hiding-tabbar-in-screens 
function AppContent() {

  const { colors } = useTheme();
  const { resetSelectedFilters, isDefaultFilter } = useFilters();

  NavigationBar.setBackgroundColorAsync(colors.tabBar);

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Details',
            headerStyle: {
              backgroundColor: colors.background
            },
            headerTintColor: colors.text,
          }}
          name="CarDetails"
          component={CarDetails}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Filters',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.background
            },
            headerTintColor: colors.text,

            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  resetSelectedFilters();
                  navigation.navigate('Discovery');
                }}
                style={{
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                  }}
                >Reset</Text>
              </TouchableOpacity>
            ),
          })}
          name="Filters"
          component={FilterScreen}
          

        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Payment'
          }}
          name="Payment"
          component={PaymentScreen}
        />
        
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Booking Details',
            headerStyle: {
              backgroundColor: colors.background
            },
            headerTintColor: colors.text,
          }}
          name="BookingDetails"
          component={BookingDetailsScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'PastBooking Details'
          }}
          name="PastBookingDetails"
          component={PastBookingDetailsScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Past Bookings',
            headerStyle: {
              backgroundColor: colors.background
            },
            headerTintColor: colors.text,
          }}
          name="PastBookings"
          component={PastBookingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style={colors.statusBarStyle} />
    </>
  );
}


export default function App() {
  // The FilterProvider is a context provider that will allow us to share the selected filters between the filter screen and the discovery screen
  return (
    <GestureHandlerRootView>
      <ThemeProvider >
        <FilterProvider>
          <AppContent />
        </FilterProvider>
      </ThemeProvider >
    </GestureHandlerRootView>
  );
}