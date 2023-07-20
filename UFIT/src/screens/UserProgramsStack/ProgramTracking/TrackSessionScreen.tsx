import React, {useState} from "react";
import { Text, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../../UserPrograms";
import { trackingStyles, repBubbleStyles } from '../../style';
import RepBubble from '../../../components/RepBubble'
// import { Session } from "../../../api";
import { useNavigation } from "@react-navigation/native";

const movements = [
    {
        _id: "64b4421b415706cb0ce13a24",
        section: "yoga1",
        movementName: "Upper body stretch",
        movementDescription: "Stretches for the upper body",
        movementLink: "anabarcari1991@gmail.com",
        typeTracking: {
            type: 'reps',
            sets: 5,
            reps: 10
        }
    },
    {
        _id: "64b4421b415706cb0ce13a25",
        section: "yoga2",
        movementName: "Lower body stretch",
        movementDescription: "Stretches for the lower body",
        movementLink: "anabarcari1991@gmail.com",
        typeTracking: {
            type: 'timer',
            time: 60,
            rounds: 3,
        }
    }
];

// used for accessing route parameters in a type-safe way
export type TrackSessionScreenRouteProp = RouteProp<StackParamList, 'Track a Session'>;

type TrackSessionScreenProps = {
    route: TrackSessionScreenRouteProp;
};

export default function TrackSessionScreen({ route }: TrackSessionScreenProps){
    const { session } = route.params;
    const [trackingData, setTrackingData] = useState({});
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList, 'Track a Session'>>();

    const gotoTimer = (time: number) => {
        navigation.navigate('TimerScreen', {time});
        console.log('TimerScreen')
    }

    return (
        <View style={[trackingStyles.viewContainer]}>
            <Text style={trackingStyles.titleBarText}>
                {session.name} 
            </Text>
            <ScrollView>
                {movements.map(movement => (
                    //map movements
                    <View key={movement._id}>
                        <Text>{movement.movementName}</Text>
                        {movement.typeTracking.type === 'reps' && 
                        // ...Array to get an Array of undefined values then map bubbles
                        <View style={trackingStyles.bubbleContainer}>
                            {[...Array(movement.typeTracking.sets)].map((_, index) => <RepBubble key={index} />)}
                        </View>
                        }
                        {movement.typeTracking.type === 'timer' &&
                            <TouchableOpacity
                                style = {trackingStyles.timerButton}
                                onPress={() => gotoTimer(movement.typeTracking.time ?? 0)}>
                            <View>
                                <Text>
                                    Timer
                                </Text>
                            </View>
                        </TouchableOpacity>
                        }
                    </View>
                ))}
                <TouchableOpacity
                    style = {trackingStyles.timerButton}
                    onPress={() => console.log(trackingData)}>
                    <View>
                        <Text>
                            Submit
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}