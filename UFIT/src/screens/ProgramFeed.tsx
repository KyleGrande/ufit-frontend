import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';



export default function ProgramFeed() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>THIS IS THE UFIT APP</Text>
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