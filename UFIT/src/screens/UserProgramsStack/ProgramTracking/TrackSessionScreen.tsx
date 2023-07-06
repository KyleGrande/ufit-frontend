import React from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../../UserPrograms";
import { trackingStyles } from '../../style';
import { Session } from "../ProgramsMainScreen";

// used for accessing route parameters in a type-safe way
export type TrackSessionScreenRouteProp = RouteProp<StackParamList, 'Track a Session'>;

type TrackSessionScreenProps = {
    route: TrackSessionScreenRouteProp;
};

export default function TrackSessionScreen({ route }: any){
    const { session } = route.params;

    return (
        <View style={trackingStyles.viewContainer}>
            <Text style={trackingStyles.titleBarText}>
                {session.name} 
            </Text>
            {/* <ScrollView>
                {session.movementId.map((movementId: string) => (
                    <Text key={movementId}>
                        {movementId}
                    </Text>
                ))}
            </ScrollView> */}
        </View>
    );
}