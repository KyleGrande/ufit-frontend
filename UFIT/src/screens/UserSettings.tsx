import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function UserSettings() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Settings
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    containerItem: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue',
        width: 350,
        height: 200,
        marginTop: 40,
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
});