import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from "../UserDiscover";
import LinearGradient from "../../components/LinearGradient";
import { getGradientColors } from "../../components/getGradient";

import API, { Session, NewProgram, Program } from "../../api";
import { programStyles, trackingStyles, discoverProgramStyles } from '../style';
import useAuth from "../../hook/useAuth";
import { useUserPrograms } from "../../provider/UserProgramsContext";
import { SafeAreaView } from "react-native-safe-area-context";

// used for accessing route parameters in a type-safe way
export type DiscoverProgramScreenRouteProp = RouteProp<StackParamList, 'Program'>;

type DiscoverProgramScreenProps = {
    route: DiscoverProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'Discovers'>;
};

export default function DiscoverProgramScreen({ route, navigation }: DiscoverProgramScreenProps){
    const { program } = route.params;
    const [movements , setMovements] = useState<any[]>([]);
    const userId = useAuth()._id as string;
    const { addProgram } = useUserPrograms();

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
        newProgram.userId = userId;
        newProgram.programName = `${program.programName} (copy)`;
        delete newProgram._id;
        API.addProgram(newProgram).then((response) => {
            console.log(response.data.data);
            let createdProgram = response.data.data;
            addProgram(createdProgram);
            //works but has an error
            // navigation.navigate('Track a Program', { program: createdProgram });
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
        <SafeAreaView>
        <View style={discoverProgramStyles.viewContainer}>
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
                    {program.session.map((session:Session, index:number) => (
                        <View key={index}>
                            <Text style={discoverProgramStyles.sessionTitle}>
                                {session.name}
                            </Text>
                        <TouchableOpacity
                            key={session._id}
                            style={discoverProgramStyles.singleSessionContainer}
                        >
                            {session.movementId?.map((movementId, index) => {
                                // Find the movement that corresponds to the movementId in the session
                                const movement = movements.find((m) => m._id === movementId);
                                return movement ? (
                                    <View style={discoverProgramStyles.movementContainer} key={index+10000}>
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
                                <Text key={index+10000} style={discoverProgramStyles.movementText}>
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
        </SafeAreaView>
        </LinearGradient>
    );
}