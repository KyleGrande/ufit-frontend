import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
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

function ProgramsMainScreen({ navigation }){
    return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Your Programs</Text>
        <View style={styles.containerItem}>
            <Button title="Create Program" 
                    color='orange' 
                    onPress={() => navigation.navigate('Create a Program')} />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      paddingLeft: 20,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    containerItem: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 250,
        height: 50,
        marginTop: 40,
        marginBottom: 40,
        marginLeft: '17%',
        // paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      },
    headerText: {
        color: 'gray',
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonCreate: {
        backgroundColor: 'orange',
        width: 350,
        height: 200,
    },
});