import React, {useState, useCallback} from "react";
import { Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'; 

import { StackParamList } from "../../UserPrograms";
import LinearGradient from "../../../components/LinearGradient";
import { getGradientColors } from "../../../components/getGradient";
import { MovementInfoModal } from "../../../components/MovementInfoModal";
import RepBubble from '../../../components/RepBubble'
import {RepSetsTracker} from '../../../components/RepSetsTracker';
import { Movement } from "../../../api";
import { trackingStyles } from '../../style';

// used for accessing route parameters in a type-safe way
export type TrackSessionScreenRouteProp = RouteProp<StackParamList, 'Track a Session'>;

type TrackSessionScreenProps = {
    route: TrackSessionScreenRouteProp;
};
export default function TrackSessionScreen({ route }: TrackSessionScreenProps){
    const rest = 5;
    const { program, session, movements } = route.params;

    const [trackingData, setTrackingData] = useState({});
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList, 'Track a Session'>>();

    const [selectedMovement, setSelectedMovement] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [completedMovements, setCompletedMovements] = useState(new Set<string>());

    const handleOnPress = useCallback((movement: Movement) => {
        setSelectedMovement(movement);
        setModalVisible(true);
    }, [setSelectedMovement, setModalVisible]);

    const onEnd = useCallback((movement: string, roundsCompleted: number, timeRemaining: number) => {
        setTrackingData(prev => ({...prev, [movement]: {roundsCompleted, timeRemaining}})); //update tracking data
        setCompletedMovements(prev => new Set([...prev, movement])); //update completed movements
    }, [setTrackingData, setCompletedMovements]);

    const gotoTimer = useCallback((time: number, movementName: string, rounds: number) => {
        navigation.navigate('TimerScreen', {time, movementName, rounds, rest: 5, onEnd});
    }, [navigation, onEnd]);
    return (

        <LinearGradient
        top={getGradientColors(program.programCategory)[0]}
        bottom={getGradientColors(program.programCategory)[1]}
        style={{ minHeight: "100%" }}
        >
        <View style={[trackingStyles.viewContainer]}>
            <Text style={trackingStyles.titleBarText}>
                {session.name} 
            </Text>
            <ScrollView>
                {movements.map(movement => (
                    //map movements
                    <View key={movement._id.$oid}>
                        <View style={[{flexDirection: 'row', alignItems:'center'}]}>
                        <Text style={trackingStyles.movementName}>{movement.movementName}</Text>
                        <TouchableOpacity style={[{ justifyContent: 'center', height:35, width:40}]} onPress={() => handleOnPress(movement)}>
                        <AntDesign name="infocirlceo" size={20} color="lightblue" />
                        </TouchableOpacity>
                        </View>
                        {movement.typeTracking.type === 'reps' && 
                        <RepSetsTracker movement={movement} sets={movement.typeTracking.sets} reps={movement.typeTracking.reps} weight={0} onRepSetTrackerChange={(setsCompleted: number) => {
                            setTrackingData(prevData => ({...prevData, [movement.movementName]: {setsCompleted, reps: movement.typeTracking.reps, weight: movement.typeTracking.weight}}))
                        }} />
                        }
                        {movement.typeTracking.type === 'timer' &&
                            <TouchableOpacity
                            style = {completedMovements.has(movement.movementName) ? [trackingStyles.timerButton, {backgroundColor: '#bbbbbb'}] : trackingStyles.timerButton}
                            onPress={() => gotoTimer(movement.typeTracking.time ?? 0, movement.movementName, movement.typeTracking.rounds ?? 0)}
                            disabled={completedMovements.has(movement.movementName)}>
                            <View>
                                <Text>
                                    Timer
                                </Text>
                            </View>
                        </TouchableOpacity>
                        }
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                    style = {trackingStyles.timerButton}
                    onPress={() => console.log(trackingData)}>
                    <View>
                        <Text>
                            Submit
                        </Text>
                    </View>
                </TouchableOpacity>
        </View>
        
        <MovementInfoModal
            selectedMovement={selectedMovement}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
        />
        </LinearGradient>
        
    );
}