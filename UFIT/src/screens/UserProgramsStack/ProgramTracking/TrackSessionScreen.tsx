import React, {useState} from "react";
import { Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'; 

import { StackParamList } from "../../UserPrograms";
import LinearGradient from "../../../components/LinearGradient";
import { getGradientColors } from "../../../components/getGradient";
import { MovementInfoModal } from "../../../components/MovementInfoModal";
import RepBubble from '../../../components/RepBubble'
import { trackingStyles } from '../../style';

// used for accessing route parameters in a type-safe way
export type TrackSessionScreenRouteProp = RouteProp<StackParamList, 'Track a Session'>;

type TrackSessionScreenProps = {
    route: TrackSessionScreenRouteProp;
};
export default function TrackSessionScreen({ route }: TrackSessionScreenProps){
    const { program, session, movements } = route.params;
    const [trackingData, setTrackingData] = useState({});
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList, 'Track a Session'>>();

    const [selectedMovement, setSelectedMovement] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOnPress = (movement: any) => {
        setSelectedMovement(movement);
        setModalVisible(true);
    }

    const gotoTimer = (time: number, movementName: string, rounds: number) => {
        navigation.navigate('TimerScreen', {time, movementName, rounds});
    }

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
                        // ...Array to get an Array of undefined values then map bubbles
                        <View style={trackingStyles.bubbleContainer}>
                            {[...Array(movement.typeTracking.sets)].map((_, index) => <RepBubble key={index} />)}
                        </View>
                        }
                        {movement.typeTracking.type === 'timer' &&
                            <TouchableOpacity
                                style = {[trackingStyles.timerButton]}
                                onPress={() => gotoTimer(movement.typeTracking.time ?? 0, movement.movementName, movement.typeTracking.rounds ?? 0)}>
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