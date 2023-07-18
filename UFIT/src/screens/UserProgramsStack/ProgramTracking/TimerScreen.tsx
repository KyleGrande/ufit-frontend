import React from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../../UserPrograms";
import { timerStyles } from '../../style';
import RepBubble from '../../../components/RepBubble'
// import { Session } from "../../../api";
import { useNavigation } from "@react-navigation/native";

type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};  
export type TimerScreenRouteProp = RouteProp<StackParamList, 'TimerScreen'>;

type TimerScreenProps = {
    route: TimerScreenRouteProp;
};

export default function TimerScreen({route}: TimerScreenProps){
    const {time} = route.params;

    return (
        <View style={timerStyles.viewContainer}>
        <Text>
            {time}
        </Text>
        </View>
    );
}