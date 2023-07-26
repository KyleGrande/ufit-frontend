import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from "../UserDiscover";
import { programStyles, trackingStyles, discoverProgramStyles } from '../style';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import API, { Program, Session } from "../../api";
import LinearGradient from "../../components/LinearGradient";
import { getGradientColors } from "../../components/getGradient";
// used for accessing route parameters in a type-safe way
export type DiscoverProgramScreenRouteProp = RouteProp<StackParamList, 'Program'>;

type DiscoverProgramScreenProps = {
    route: DiscoverProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'Discover'>;
};

export default function DiscoverProgramScreen({ route, navigation }: DiscoverProgramScreenProps){
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
            <Text style={[discoverProgramStyles.theProgramTitle, {fontWeight: "normal"}]}>
                Catagory: {program.programCategory.toUpperCase()}
            </Text>
            <Text style={discoverProgramStyles.programDescription}>
                {program.programDescription}
            </Text>
            <Text style={discoverProgramStyles.theProgramTitle}>
                The Program
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
                <View style={programStyles.buttonContainer}>
                    <Button 
                        title="Add Program" 
                        color='orange' 
                        onPress={() => 
                            console.log(program)}
                    />
                </View>
        </View>
        </LinearGradient>
    );
}