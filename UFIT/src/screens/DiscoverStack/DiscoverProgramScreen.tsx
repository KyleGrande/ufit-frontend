import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamList } from "../UserDiscover";
import LinearGradient from "../../components/LinearGradient";
import { getGradientColors } from "../../components/getGradient";

import API, { Session, NewProgram, Program, api } from "../../api";
import { programStyles, trackingStyles, discoverProgramStyles } from '../style';
import useAuth from "../../hook/useAuth";
import { useUserPrograms } from "../../provider/UserProgramsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMovementsContext } from "../MovementsContext";
import FeedBackCard from "../../components/FeedbackCard";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// used for accessing route parameters in a type-safe way
export type DiscoverProgramScreenRouteProp = RouteProp<StackParamList, 'Program'>;

type DiscoverProgramScreenProps = {
    route: DiscoverProgramScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'Discovers'>;
};

export default function DiscoverProgramScreen({ route, navigation }: DiscoverProgramScreenProps){
    const { program } = route.params;
    const { movements, handleMovements, feedbacks, getFeedbacks } = useMovementsContext();
    const [movementsData , setMovements] = useState<any[]>([]);
    const [feedbackData, setFeedbacks] = useState(feedbacks);
    const userId = useAuth()._id as string;
    const { addProgram } = useUserPrograms();

    useEffect(()=> {
        setFeedbacks(feedbacks);
    }, [feedbacks])

    useEffect(()=> {
        setMovements(movements);
    }, [movements])
    

    useEffect(() => {        
        handleMovements(program);
        getFeedbacks(program);
    }, [program]);

    const handleOnPress = () => {
        let newProgram: NewProgram = {...program};
        newProgram.userId = userId;
        newProgram.programName = program.programName;
        newProgram.originalProgramId = program._id;
        delete newProgram._id;
        API.addProgram(newProgram).then((response) => {
            console.log(response.data.data);
            let createdProgram = response.data.data;
            addProgram(createdProgram);
            Alert.alert(
                "Subscribed!",
                "Program has been added to Your Programs"
            );
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

            {program.isCreatedByAI && (
            <View style={[trackingStyles.submitButton,{flexDirection:'row', alignSelf:'flex-start', maxWidth:'40%', marginLeft:20, marginVertical:5}]}>
            <Text style={[discoverProgramStyles.sessionTitle, {fontSize:16, fontWeight:'normal'}]}>AI Generated  </Text>
            <FontAwesome5 name="brain" size={24} color="white" />
          </View>
            )}
            {
                program.programCategory.toLowerCase() === 'strength' && (
                    <Text style={{color:'white', marginLeft:20, fontSize:20, marginTop:10}}>
                    <Ionicons name="barbell" size={20} color="white" /> Strength
                    </Text>
                    )
            }
            {
                program.programCategory.toLowerCase() === 'yoga' && (
                    <Text style={{color:'white', marginLeft:20, fontSize:20, marginTop:10}}>
                        <Ionicons name="fitness" size={20} color="white" /> Yoga
                    </Text>
                )
            }
            {
                program.programCategory.toLowerCase() === 'cardio' && (
                    <Text style={{color:'white', marginLeft:20, marginTop:10, fontSize:20}}>
                        <Ionicons name="walk" size={20} color="white" /> Cardio
                    </Text>
                )
            }
            {
                program.programCategory.toLowerCase() === 'custom' && (
                    <Text style={{color:'white', marginLeft:20, marginTop:10, fontSize:20}}>
                        <FontAwesome5 name="pencil-ruler" size={20} color="white" /> Custom               
                    </Text>
                )
            }
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
                                const movement = movementsData.find((m) => m._id === movementId);
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
                                null
                            })}
                        </TouchableOpacity>
                        </View>
                    ))}
                    {feedbacks && feedbacks?.length > 0 &&(
                <>
                <Text style={discoverProgramStyles.sessionTitle}>
                    Feedback:
                </Text>
                <ScrollView >
                    {feedbacks?.map((f:any, index:number)=> {
                        return (
                            <View key={index}>
                            <FeedBackCard username={f.userId} rating = {f.rating} comment = {f.comment} />
                            </View>
                        )
                    })}
                    {/* <FeedBackCard username = "Ricardo" rating = "10" comment = "Awesome program!"/>
                    <FeedBackCard username = "Ricardo" rating = "10" comment = "Awesome program!"/>
                    <FeedBackCard username = "Ricardo" rating = "10" comment = "Awesome program!"/>
                    <FeedBackCard username = "Ricardo" rating = "10" comment = "Awesome program!"/>
                    <FeedBackCard username = "Ricardo" rating = "10" comment = "Awesome program!"/>
                    <FeedBackCard username = "Ricardo" rating = "10" comment = "Awesome program!"/>
                    <FeedBackCard username = "Ricardo" rating = "10" comment = "Awesome program!"/> */}
                </ScrollView>
                </>
                )}
                </ScrollView>
                
                <TouchableOpacity style={programStyles.buttonContainer} onPress={handleOnPress}>
                    <Button 
                        title="Add Program" 
                        color='white' 
                        onPress={handleOnPress}
                    />
                </TouchableOpacity>
        </View>
        </SafeAreaView>
        </LinearGradient>
    );
}