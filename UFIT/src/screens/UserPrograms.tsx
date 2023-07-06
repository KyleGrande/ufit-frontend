import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProgramCreate from './UserProgramsStack/ProgramCreation/ProgramCreate'; 
import ProgramsMainScreen from './UserProgramsStack/ProgramsMainScreen';
import TrackProgramScreen from './UserProgramsStack/ProgramTracking/TrackProgramScreen';
import TrackSessionScreen from './UserProgramsStack/ProgramTracking/TrackSessionScreen';
export type StackParamList = {
    'User Programs': undefined;
    'Create a Program': undefined;
    'Track a Program': { program: any };
    'Track a Session': { session: any };
};


const stack = createNativeStackNavigator<StackParamList>();

export default function UserPrograms( ) {
    return (
        <stack.Navigator initialRouteName='User Programs'>
            <stack.Screen 
                name="User Programs" 
                component={ProgramsMainScreen} 
                options={{ 
                    headerShown: false}}
            />
            <stack.Screen 
                name="Create a Program" 
                component={ProgramCreate} 
                options={{ 
                    headerTransparent: true, 
                    headerTintColor: 'white'  }}
                    
            />
            <stack.Screen 
                name="Track a Program" 
                component={TrackProgramScreen} 
                options={{ 
                    headerTransparent: true, 
                    headerTintColor: 'white',
                    headerTitle: ''  }}
            />
            <stack.Screen
                name="Track a Session"
                component={TrackSessionScreen}
                options={{
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerTitle: ''
                }}
            />
        </stack.Navigator>
    );
}