import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default function ProgramFeed() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Discover
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

    headerText: {
        color: 'gray',
        fontSize: 30,
        fontWeight: 'bold',
    },
});