import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {styles} from './style';

export default function UserAnalytics() {
    
    return (
        <View style={styles.viewContainer}>
            <Text style={styles.titleBarText}>
                Analytics
            </Text>
        </View>
    );
}