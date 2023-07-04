import React from "react";
import { StyleSheet, Text, View } from "react-native";


export default function ProgramCreate() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tcreate</Text>
            <Text> It's gonna be a great app. </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});