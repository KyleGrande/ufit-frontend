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
import { programStyles, trackingStyles } from '../../style';
import { object } from "yup";
import { FontAwesome } from '@expo/vector-icons'; 
import { MovementNoteModal } from "../../../components/MovementNoteModal";


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
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [noteModalVisible, setNoteModalVisible] = useState(false);

    const handleOnInfoPress = useCallback((movement: Movement) => {
        setSelectedMovement(movement);
        setInfoModalVisible(true);
    }, [setSelectedMovement, setInfoModalVisible]);

    const handleOnNotePress = useCallback((movement: Movement) => {
        setSelectedMovement(movement);
        setNoteModalVisible(true);
    }, [setSelectedMovement, setInfoModalVisible]);

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
            userId: program.userId,
            programId: program._id,
            programName: program.programName,
            sessionName: session.name,
            workoutDate: new Date(),
            movements: getMovementTrackingData(),
            
        }
        console.log('sending to api');
        api.insertWorkoutHistory(histories).then((response) => {
            console.log(response.status);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    };


    return (

        <LinearGradient
        top={getGradientColors(program.programCategory.toLowerCase())[0]}
        bottom={getGradientColors(program.programCategory.toLowerCase())[1]}
        style={{ minHeight: "100%" }}
        >
        <View style={[trackingStyles.viewContainer]}>
            <Text style={[trackingStyles.titleBarText]}>
                {session.name} 
            </Text>
            <ScrollView 
            // style={programStyles.programsContainer}
            >
                {movements.map(movement => (
                    //map movements
                    <View key={movement._id.$oid}>
                        <View style={[{flexDirection: 'row', alignItems:'center'}]}>
                        <Text style={[trackingStyles.movementName, {fontWeight:'bold'}]}>{movement.movementName}</Text>
                        <TouchableOpacity style={[{ justifyContent: 'center', height:35, width:40}]} onPress={() => handleOnInfoPress(movement)}>
                        <AntDesign name="infocirlceo" size={20} color="lightblue" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ justifyContent: 'center', height:35, width:40}]} onPress={() => handleOnNotePress(movement)}>
                        <FontAwesome name="sticky-note-o" size={20} color="lightblue" />
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
                    style = {[trackingStyles.submitButton, {alignSelf:'center'}]}
                    onPress={handleSubmit}
                    >
                    <View
                    style={[]}>
                        <Text style={{color:'white', fontWeight:'bold'}}>
                            Submit
                        </Text>
                    </View>
                </TouchableOpacity>
        </View>
        
        <MovementInfoModal
            selectedMovement={selectedMovement}
            modalVisible={infoModalVisible}
            setModalVisible={setInfoModalVisible}
        />
        <MovementNoteModal
            selectedMovement={selectedMovement}
            modalVisible={noteModalVisible}
            setModalVisible={setNoteModalVisible}
        />

        </LinearGradient>
        
    );
}