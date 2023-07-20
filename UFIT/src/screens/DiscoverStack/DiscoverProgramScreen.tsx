import React from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from "../UserDiscover";
import { trackingStyles } from '../style';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Program } from "../../api";
// used for accessing route parameters in a type-safe way
export type DiscoverProgramScreenRouteProp = RouteProp<StackParamList, 'Program'>;

type DiscoverProgramScreenProps = {
    route: DiscoverProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'Discover'>;
};

export default function TrackProgramScreen({ route, navigation }: DiscoverProgramScreenProps){
    const { program } = route.params;

    return (
        <View style={trackingStyles.viewContainer}>
            <Text style={trackingStyles.titleBarText}>
                {program.programName} 
            </Text>
        </View>
    );
}