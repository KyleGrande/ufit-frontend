import * as React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarHeightCallbackContext, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserPrograms from './src/screens/UserPrograms';
import UserSettings from './src/screens/UserSettings';
import UserAnalytics from './src/screens/UserAnalytics';
import { Ionicons } from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserAuth from './src/screens/UserAuth';
import UserDiscover from './src/screens/UserDiscover';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native'
// import { Text, View } from 'react-native';

// LogBox.ignoreAllLogs (); //Ignore all log notifications for demo
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackDecider() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        extractToken();

        async function extractToken (){
            const token = await AsyncStorage.getItem('token');
            console.log('token', token)
            if(token) setIsLoggedIn(true)
            setLoading(false)
        }
    },[])

    if(loading) return null
    
    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <Stack.Screen name="App"  component={() => <MyTabs setIsLoggedIn={setIsLoggedIn} /> } options={{headerShown: false}}  />
            ) : (
                <Stack.Screen name="Auth" component={() => <UserAuth setIsLoggedIn={setIsLoggedIn} />} options={{headerShown: false}}/>
            )}
        </Stack.Navigator>
    );
}
function MyTabs({setIsLoggedIn}: any) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Discover') {
                    iconName = focused ? 'ios-apps' : 'ios-apps-outline';
                } else if (route.name === 'Programs') {
                    iconName = focused ? 'ios-barbell' : 'ios-barbell-outline';
                } else if (route.name === 'Analytics') {
                    iconName = focused ? 'ios-bar-chart' : 'ios-bar-chart-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                }
                return <Ionicons 
                        name={iconName as any} 
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
                component={UserDiscover}
                options={{headerShown: false}}
            />
            <Tab.Screen 
                name="Programs" 
                component={UserPrograms} 
                options={{ headerShown: false }}
            />
            <Tab.Screen 
                name="Analytics" 
                component={UserAnalytics} 
                options={{ headerShown: false }}
            />
            <Tab.Screen 
                name="Settings" 
                component={()=> <UserSettings setIsLoggedIn={setIsLoggedIn} />} 
                options={{headerShown: false}}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <StackDecider />
            {/* <MyTabs /> */}
        </NavigationContainer>
    );
}