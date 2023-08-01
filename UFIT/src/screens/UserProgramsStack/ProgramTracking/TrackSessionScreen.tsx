import React, {useState, useCallback} from "react";
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'; 

import { StackParamList } from "../../UserPrograms";
import LinearGradient from "../../../components/LinearGradient";
import { getGradientColors } from "../../../components/getGradient";
import { MovementInfoModal } from "../../../components/MovementInfoModal";
import RepBubble from '../../../components/RepBubble'

import {RepSetsTracker} from '../../../components/RepSetsTracker';
import { RoundsTracker } from "../../../components/RoundsTracker";

import api, { Movement, TrackingDataSchema, WorkoutHistory } from "../../../api";
import { trackingStyles } from '../../style';
import { object } from "yup";

// used for accessing route parameters in a type-safe way
export type TrackSessionScreenRouteProp = RouteProp<StackParamList, 'Track a Session'>;

type TrackSessionScreenProps = {
    route: TrackSessionScreenRouteProp;
};
export default function TrackSessionScreen({ route }: TrackSessionScreenProps){
    const { program, session, movements } = route.params;

    type TrackingData = Record<string, TrackingDataSchema[]>;

    const [trackingData, setTrackingData] = useState<TrackingData>({});

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList, 'Track a Session'>>();

    const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
    const [modalVisible, setModalVisible] = useState(false);


    const handleOnPress = useCallback((movement: Movement) => {
        setSelectedMovement(movement);
        setModalVisible(true);
    }, [setSelectedMovement, setModalVisible]);

    const getMovementTrackingData = useCallback(() => {
        return movements.map(movement => ({
            movementId: movement._id,
            movementName: movement.movementName,
            section: 'main',
            trackingData: trackingData[movement.movementName],
        }));
    }, [movements, trackingData]);

    const handleSubmit = () => {
        console.log(getMovementTrackingData())
        const histories = {
            userId: '60a6d9b3e13a0a0015b9a8a0',
            programId: program._id,
            programName: program.programName,
            sessionName: session.name,
            workoutDate: new Date(),
            movements: getMovementTrackingData(),
            
        }
        console.log('sending to api');
        api.insertWorkoutHistory(histories).then((response) => {
            console.log(response);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    };


    return (

        <LinearGradient
        top={getGradientColors(program.programCategory)[0]}
        bottom={getGradientColors(program.programCategory)[1]}
        style={{ minHeight: "100%" }}
        >
        <View style={[trackingStyles.viewContainer]}>
            <Text style={[trackingStyles.titleBarText]}>
                {session.name} 
            </Text>
            <ScrollView>
                {movements.map(movement => (
                    //map movements
                    <View key={movement._id.$oid}>
                        <View style={[{flexDirection: 'row', alignItems:'center'}]}>
                        <Text style={[trackingStyles.movementName, {fontWeight:'bold'}]}>{movement.movementName}</Text>
                        <TouchableOpacity style={[{ justifyContent: 'center', height:35, width:40}]} onPress={() => handleOnPress(movement)}>
                        <AntDesign name="infocirlceo" size={20} color="lightblue" />
                        </TouchableOpacity>
                        </View>
                        {movement.typeTracking.trackingType === 'setsreps' && 
                        <RepSetsTracker 
                            movement={movement} 
                            sets={movement.typeTracking.sets} 
                            reps={movement.typeTracking.reps} 
                            weight={movement.typeTracking.weight} 
                            onRepSetTrackerChange={(setsCompleted: number, weight: number, reps:number) => {
                                const currentData = trackingData[movement.movementName] || {};
                                setTrackingData(prevData => ({
                                    ...prevData,
                                    [movement.movementName]: {
                                        ...currentData,
                                        trackingType: movement.typeTracking.trackingType,
                                        setsCompleted,
                                        reps,
                                        weight
                                    }
                                }));
                            }
                        }
                        />
                        }
                        {movement.typeTracking.trackingType === 'rounds' &&
                        <RoundsTracker
                            rounds={movement.typeTracking.rounds ?? 0}
                            roundMin={movement.typeTracking.roundMin ?? 0}
                            roundSec={movement.typeTracking.roundSec ?? 0}
                            restMin={movement.typeTracking.restMin ?? 0}
                            restSec={movement.typeTracking.restSec ?? 0}
                            movementName={movement.movementName}
                            onRoundsTrackerChange={(roundsCompleted: number, roundMinRemain: number, roundSecRemain: number) => {
                                const currentData = trackingData[movement.movementName] || {};
                                setTrackingData(prevData => ({
                                    ...prevData,
                                    [movement.movementName]: {
                                        ...currentData,
                                        trackingType: movement.typeTracking.trackingType,
                                        roundsCompleted,
                                        roundMinRemain,
                                        roundSecRemain
                                    }
                                }));
                            }
                        }
                        />
                        }
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                    style = {[trackingStyles.timerButton, {alignSelf:'center'}]}
                    onPress={handleSubmit}
                    >
                    <View
                    style={[]}>
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