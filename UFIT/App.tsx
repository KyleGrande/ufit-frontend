import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarHeightCallbackContext, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProgramFeed from './src/screens/ProgramFeed';
import UserPrograms from './src/screens/UserPrograms';
import UserSettings from './src/screens/UserSettings';
import { Ionicons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Discover') {
            iconName = focused ? 'ios-apps' : 'ios-apps-outline';
          } else if (route.name === 'Programs') {
            iconName = focused ? 'ios-barbell' : 'ios-barbell-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }
          return <Ionicons 
                    name={iconName} 
                    size={size} 
                    color={color} 
                  />;
        },

          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 100,
          },
      })}
    >
      <Tab.Screen
        name="Discover"
        component={ProgramFeed}
        options={{headerShown: false}}
      />

      <Tab.Screen 
        name="Programs" 
        component={UserPrograms} 
        options={{ tabBarBadge: 3, headerShown: false }}
      />

      <Tab.Screen 
        name="Settings" 
        component={UserSettings} 
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}