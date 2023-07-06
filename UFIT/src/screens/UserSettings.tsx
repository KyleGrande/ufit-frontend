import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {styles} from './style';

export default function UserSettings() {
    return (
        <View style={styles.viewContainer}>
            <Text style={styles.titleBarText}>
                Settings
            </Text>
        </View>
    );
}