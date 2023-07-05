import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramCreate from './ProgramCreation/ProgramCreate'; 

const stack = createNativeStackNavigator();

export default function UserPrograms( ) {
    return (
        <stack.Navigator initialRouteName='Program'>
            <stack.Screen name="ProgramsMain" component={ProgramsMainScreen} options={{ headerShown: false}}/>
            <stack.Screen name="Create a Program" component={ProgramCreate} options={{ headerTransparent: true, headerTintColor: 'white'  }}  />
        </stack.Navigator>
    );
}

function ProgramsMainScreen({navigation}){
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>UserPrograms:</Text>
        <Text> none </Text>
        <Button title="Create Program" onPress={() => navigation.navigate('Create a Program')} />
    </View>
    );
}