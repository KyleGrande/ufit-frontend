import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../../UserPrograms";


// used for accessing route parameters in a type-safe way
export type TrackProgramScreenRouteProp = RouteProp<StackParamList, 'Track a Program'>;

type TrackProgramScreenProps = {
    route: TrackProgramScreenRouteProp;
};

export default function TrackProgramScreen({ route }: TrackProgramScreenProps){
    const { programId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                One day
            </Text>
            <Text style={styles.text}>
                You'll be able to track here
            </Text>
            <Text style={styles.text}>
                {programId}
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