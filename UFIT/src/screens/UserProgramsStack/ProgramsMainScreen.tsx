import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

type StackParamList = {
    'User Programs': undefined;
    'Create a Program': undefined;
};

type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function ProgramsMainScreen({ navigation }: ProgramsMainScreenProps){
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Your Programs
            </Text>
            <View style={styles.containerItem}>
                <Button 
                    title="Create Program" 
                    color='orange' 
                    onPress={() => 
                        navigation.navigate('Create a Program')} 
                    />
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