import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProgramCreate from './UserProgramsStack/ProgramCreation/ProgramCreate'; 
import ProgramsMainScreen from './UserProgramsStack/ProgramsMainScreen';

type StackParamList = {
    'User Programs': undefined;
    'Create a Program': undefined;
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
        </stack.Navigator>
    );
}

