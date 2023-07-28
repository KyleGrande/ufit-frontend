import React, {useState} from "react";
import { Text, View, ScrollView, Pressable, TouchableOpacity, Modal } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../../UserPrograms";
import { trackingStyles, repBubbleStyles } from '../../style';
import RepBubble from '../../../components/RepBubble'
import { getGradientColors } from "../../../components/getGradient";
import LinearGradient from "../../../components/LinearGradient";
// import { Session } from "../../../api";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 
import { Video } from 'expo-av';
// import { WebView } from 'react-native-webview';
import YoutubePlayer from "react-native-youtube-iframe"; 


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
        console.log('test', selectedMovement)
        setModalVisible(true);
    }

    const gotoTimer = (time: number, movementName: string) => {
        navigation.navigate('TimerScreen', {time, movementName});
        console.log('TimerScreen')
    }

    return (

        <LinearGradient
        top={getGradientColors(program.programCategory)[0]}
        bottom={getGradientColors(program.programCategory)[1]}
        style={{ minHeight: "100%" }}
        >
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
                <Pressable style={{flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minWidth: 40,
                                    backgroundColor: 'rgba(0,0,0,0.5)'}} 
                            onPress={() => setModalVisible(false)} 
                            onStartShouldSetResponder={() => true}>
                    <View style={{backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 20}} 
                    onStartShouldSetResponder={() => true}
                    >
                    <Text
                    style={[{paddingBottom: 7, fontSize: 16}]}>{selectedMovement?.movementDescription}</Text>
                    {selectedMovement?.movementLink && (
                        <YoutubePlayer
                            height={170}
                            width={300}
                            play={false}
                            // videoId={selectedMovement.movementLink}
                            videoId="dQw4w9WgXcQ"
                        />
                    )}
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        <View style={[trackingStyles.viewContainer]}>
            <Text style={trackingStyles.titleBarText}>
                {session.name} 
            </Text>
            <ScrollView>
                {movements.map(movement => (
                    //map movements
                    <View key={movement._id}>
                        <View style={[{flexDirection: 'row'}]}>
                        <Text style={trackingStyles.movementName}>{movement.movementName}</Text>
                        <TouchableOpacity style={[{ justifyContent: 'center', height:24}]} onPress={() => handleOnPress(movement)}>
                        <AntDesign name="infocirlceo" size={24} color="lightblue" />
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
                                style = {trackingStyles.timerButton}
                                onPress={() => gotoTimer(movement.typeTracking.time ?? 0, movement.movementName)}>
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
        </LinearGradient>
        
    );
}