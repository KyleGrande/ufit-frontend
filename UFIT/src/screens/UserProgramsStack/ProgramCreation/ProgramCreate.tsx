import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProgramCreate() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                One day
            </Text>
            <Text style={styles.text}>
                You'll be able to create here
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});