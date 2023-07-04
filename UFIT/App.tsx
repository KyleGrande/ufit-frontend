import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarHeightCallbackContext, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProgramFeed from './src/screens/ProgramFeed';
import UserPrograms from './src/screens/UserPrograms';
import UserSettings from './src/screens/UserSettings';

function MyPrograms() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>myPrograms</Text>
    </View>
  );
}

function HomeFeed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>THIS IS THE UFIT APP</Text>
        <Text> It's gonna be a great app. </Text>
    </View>
  );
}

function MySettings() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>mySettings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={ProgramFeed}
      />
      <Tab.Screen 
        name="User Programs" 
        component={UserPrograms} 
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen 
        name="Settings" 
        component={UserSettings} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
        {/* <StatusBar style="auto" /> */}
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
