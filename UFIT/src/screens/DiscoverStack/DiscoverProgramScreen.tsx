import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from "../UserDiscover";
import LinearGradient from "../../components/LinearGradient";
import { getGradientColors } from "../../components/getGradient";

import API, { Session, NewProgram } from "../../api";
import { programStyles, trackingStyles, discoverProgramStyles } from '../style';

// used for accessing route parameters in a type-safe way
export type DiscoverProgramScreenRouteProp = RouteProp<StackParamList, 'Program'>;

type DiscoverProgramScreenProps = {
    route: DiscoverProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'Discover'>;
};

export default function DiscoverProgramScreen({ route, navigation }: DiscoverProgramScreenProps){
    const { program } = route.params;
    const [movements , setMovements] = useState<any[]>([]);

    const getMovements = async (ids: {$oid:string}[]) => {
        try {
            const response = await API.getMovementByIds(ids);
            // console.log('response.data', response.data.data);
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

    const handleOnPress = () => {
        let newProgram: NewProgram = {...program};
        newProgram.userId = '60a6d9b3e13a0a0015b9a8a0';
        newProgram.programName = `${program.programName} (copy)`;
        delete newProgram._id;
        API.addProgram(newProgram).then((response) => {
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }


    return (
        <LinearGradient
        top={getGradientColors(program.programCategory.toLowerCase())[0]}
        bottom={getGradientColors(program.programCategory.toLowerCase())[1]}
        style={{ minHeight: "100%" }}
        >
        <View style={trackingStyles.viewContainer}>
            <Text style={trackingStyles.titleBarText}>
                {program.programName} 
            </Text>
            <Text style={[discoverProgramStyles.theProgramTitle, {fontWeight: "normal"}]}>
                Category: {program.programCategory.toUpperCase()}
            </Text>
            <Text style={discoverProgramStyles.programDescription}>
                {program.programDescription}
            </Text>
            <Text style={discoverProgramStyles.theProgramTitle}>
                Sessions
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
                                        {movement.typeTracking.trackingType === 'setsreps' ?
                                        `${movement.typeTracking.sets} x ${movement.typeTracking.reps}` :
                                        `${movement.typeTracking.rounds}R x ${movement.typeTracking.roundMin}:${movement.typeTracking.roundSec < 10 ? '0' : ''}${movement.typeTracking.roundSec}`
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
                        color='white' 
                        onPress={handleOnPress}
                    />
                </View>
        </View>
        </LinearGradient>
    );
}