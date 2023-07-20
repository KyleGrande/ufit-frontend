import React, { useEffect } from "react";
import { Button, Text, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from "../UserDiscover";
import { programStyles, trackingStyles, discoverProgramStyles } from '../style';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Program } from "../../api";
// used for accessing route parameters in a type-safe way
export type DiscoverProgramScreenRouteProp = RouteProp<StackParamList, 'Program'>;

type DiscoverProgramScreenProps = {
    route: DiscoverProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'Discover'>;
};

export default function DiscoverProgramScreen({ route, navigation }: DiscoverProgramScreenProps){
    const { program } = route.params;

    return (
        <View style={trackingStyles.viewContainer}>
            <Text style={trackingStyles.titleBarText}>
                {program.programName} 
            </Text>
            <Text style={discoverProgramStyles.programDescription}>
                {program.programDescription}
            </Text>
            <Text style={discoverProgramStyles.theProgramTitle}>
                The Program
            </Text>
            <ScrollView style={trackingStyles.sessionsContainer}>
                    {program.session.map((session:Session) => (
                        <TouchableOpacity
                            key={session._id}
                            style={trackingStyles.singleSessionContainer}
                        >
                            <Text style={trackingStyles.sessionTitle}>
                                {session.name}
                            </Text>
                                 {/* and displaying the oid isnt useful  */}
                                {session.movementId?.map((movementId) => (
                                    <Text key={movementId.toString()}>
                                        {movementId.toString()}
                                    </Text>
                                ))}
                        </TouchableOpacity>
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
    );
}