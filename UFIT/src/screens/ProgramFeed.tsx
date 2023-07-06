import * as React from 'react';
import { Text, View} from 'react-native';
import { styles } from './style';

export default function ProgramFeed() {
    return (
        <View>
            <View style={styles.viewContainer}>
                <Text style={styles.titleBarText}>
                    Discover
                </Text>
            </View>
        </View>
    );
}