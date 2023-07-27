import React, {useState, useEffect} from "react";
import { Text, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from "../../UserPrograms";
import { trackingStyles, discoverProgramStyles } from '../../style';
import { Session } from "../../../api";
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getGradientColors } from "../../../components/getGradient";
import LinearGradient from "../../../components/LinearGradient";
import API from "../../../api";
// used for accessing route parameters in a type-safe way
export type TrackProgramScreenRouteProp = RouteProp<StackParamList, 'Track a Program'>;


type TrackProgramScreenProps = {
    route: TrackProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function TrackProgramScreen({ route, navigation }: TrackProgramScreenProps){
    const { program } = route.params;
    const [movements , setMovements] = useState<any[]>([]);

    const getMovements = async (ids: string[]) => {
        try {
            const response = await API.getMovementByIds(ids);
            console.log('response.data', response.data.data);
            setMovements(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let movementIds = [];
        program.session.forEach((session) => {
            movementIds.push(...session.movementId);
        } );
        getMovements(movementIds);
        console.log(movementIds);
    }, [program]);

    return (
        <LinearGradient
        top={getGradientColors(program.programCategory)[0]}
        bottom={getGradientColors(program.programCategory)[1]}
        style={{ minHeight: "100%" }}
        >
        <View style={trackingStyles.viewContainer}>
            <Text style={trackingStyles.titleBarText}>
                {program.programName} 
            </Text>
                <ScrollView style={trackingStyles.sessionsContainer}>
                    {program.session.map((session:Session) => (
                        <View>
                            <Text style={discoverProgramStyles.sessionTitle}>
                                {session.name}
                            </Text>
                        <TouchableOpacity
                            key={session._id}
                            style={discoverProgramStyles.singleSessionContainer}
                            onPress={() => {{
                                // Get the movements that correspond to the movementIds in the session
                                const sessionMovements = session.movementId?.map((movementId) => 
                                    movements.find((m) => m._id === movementId)
                                ).filter(Boolean);
                                navigation.navigate('Track a Session', { session, movements: sessionMovements })}
                            }}
                        >
                            {session.movementId?.map((movementId) => {
                                // Find the movement that corresponds to the movementId in the session
                                const movement = movements.find((m) => m._id === movementId);
                                return movement ? (
                                    <View style={discoverProgramStyles.movementContainer} key={movement._id}>
                                    <Text style={discoverProgramStyles.movementText}>
                                        {movement.movementName}
                                    </Text>
                                    <Text style={discoverProgramStyles.movementText}>
                                        {movement.typeTracking.type === 'reps' ?
                                        `${movement.typeTracking.sets} x ${movement.typeTracking.reps}` :
                                        `${movement.typeTracking.rounds}R x ${movement.typeTracking.time}s`
                                        }
                                    </Text>

                                    </View>
                                    
                                ) : 
                                <Text style={discoverProgramStyles.movementText}>
                                    Movement not found
                                </Text>
                            })}
                        </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
        </View>
        </LinearGradient>
    );
}
    