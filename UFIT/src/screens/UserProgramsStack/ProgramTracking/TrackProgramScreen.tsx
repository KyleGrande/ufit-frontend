import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../../UserPrograms";
import { trackingStyles } from '../../style';

// used for accessing route parameters in a type-safe way
export type TrackProgramScreenRouteProp = RouteProp<StackParamList, 'Track a Program'>;

type TrackProgramScreenProps = {
    route: TrackProgramScreenRouteProp;
};

export default function TrackProgramScreen({ route }: TrackProgramScreenProps){
    const { programId } = route.params;

    return (
        <View style={trackingStyles.viewContainer}>
            <Text>
                One day
            </Text>
            <Text >
                You'll be able to track here
            </Text>
            <Text>
                {programId}
            </Text>
        </View>
    );
}