import React, {useState, useEffect} from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from "../../UserPrograms";
import LinearGradient from "../../../components/LinearGradient";
import { getGradientColors } from "../../../components/getGradient";

import API, {Session, Movement}from "../../../api";
import { trackingStyles, discoverProgramStyles } from '../../style';

// used for accessing route parameters in a type-safe way
export type TrackProgramScreenRouteProp = RouteProp<StackParamList, 'Track a Program'>;


type TrackProgramScreenProps = {
    route: TrackProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function TrackProgramScreen({ route, navigation }: TrackProgramScreenProps){
    const { program } = route.params;
    const [movements , setMovements] = useState<Movement[]>([]);

    const getMovements = async (ids: {$oid:string}[]) => {
        try {
            const response = await API.getMovementByIds(ids);
            console.log('response.data', response.data.data);
            setMovements(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let movementIds:{$oid:string}[] = [];
        program.session.forEach((session) => {
            movementIds.push(...session.movementId);
        } );
        getMovements(movementIds);
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
                                    movements.find((m) => m._id.$oid === movementId.$oid)
                                ).filter(Boolean) as Movement[];
                                navigation.navigate('Track a Session', { program, session, movements: sessionMovements })}
                            }}
                        >
                            {session.movementId?.map((movementId) => {
                                // Find the movement that corresponds to the movementId in the session
                                const movement = movements.find((m) => m._id === movementId);
                                return movement ? (
                                    <View style={discoverProgramStyles.movementContainer} key={movement._id.$oid}>
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
    