import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';



export default function ProgramFeed() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Discover</Text>
            <View style={styles.containerItem}>
                <Text>A workout:</Text>
                <Text> none </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      paddingTop: 100,
      paddingLeft: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    containerItem: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 350,
        height: 200,
        marginTop: 40,
        // paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
  });