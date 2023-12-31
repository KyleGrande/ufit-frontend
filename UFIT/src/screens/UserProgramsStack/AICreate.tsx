// import * as React from 'react';
import React, {useState} from 'react';
import { Text, View, Button, ScrollView, Pressable, TextInput, Touchable, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserPrograms';
import {programStyles, trackingStyles, discoverProgramStyles} from '../style';
import API, { Program, Session } from '../../api';
import axios from 'axios';
import LinearGradient from '../../components/LinearGradient';
import { getGradientColors } from '../../components/getGradient';
import useAuth from '../../hook/useAuth';
import { useUserPrograms } from '../../provider/UserProgramsContext';
// used for calling navigation ina type safe way
type AICreateScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function AICreate({ navigation  }: AICreateScreenProps){
    const [textInput, setTextInput] = useState<string>('');
    const [aiProgram, setAiProgram] = useState<any>();
    const [isGettingAiProgram, setIsGettingAiProgram] = useState<boolean>(false);
    const userId = useAuth()._id as string;
    const handleSubmit = () => {
        console.log(textInput);
        setIsGettingAiProgram(true);
        axios.post('http://192.168.0.209:3003/', {
        // axios.post('http://localhost:3003/', {
            text: textInput
        })
        .then(response => {
            console.log(response.data);
            setAiProgram(response.data);
            setIsGettingAiProgram(false);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const { addProgram } = useUserPrograms();
    const handleOnPress = async () => {
        let newProgram = {...aiProgram};
        try {
            await handleSessions(newProgram);
            newProgram.userId = userId;
            newProgram.isCreatedByAI = true;
            let response = await API.addProgram(newProgram);
            // console.log(response.data);
            let createdProgram: Program = response.data.data;
            addProgram(createdProgram);
            // navigation.navigate('Track a Program', {program: createdProgram});
            navigation.navigate('User Programs');
        } catch (err) {
            console.error(err);
        }
    }
    const handleOnModifyPress = async () => {
        let textInput2 = JSON.stringify(aiProgram);
        console.log(textInput2);
        textInput2 = textInput2 + '/n ' +textInput;
        console.log(textInput2);
        setIsGettingAiProgram(true);
        axios.post('http://localhost:3003/', {
            text: textInput2
        })
        .then(response => {
            console.log(response.data);
            setAiProgram(response.data);
            setIsGettingAiProgram(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    };

    const createMovements = async(movements:any) => {
        let movementsBuffer = []
        for(const m of movements){
            try{
                console.log('MOVEMENT DATA POST TO SERVER');
                console.log(m);
                let response = await API.addMovement( m);
                console.log("getting response............");
                if (response.data.success) {
                    console.log('response.success exists');            
                    movementsBuffer.push(response.data.data._id);
                } else {
                    console.log('no response.success');
                    return [];
                }
            }
            catch(err){
                console.log('Error: ', err);
                return [];
            }
            }
        return movementsBuffer;
    }
    
    const handleSessions = async(data:any) => {
        let sessions = data.session;
        console.log("inside handle Sessions");
        console.log(sessions);
        for(let session of sessions){
            try {
                let handledMovements = await createMovements(session.movements); // array of ObjectId(s)
                console.log('after calling createMovements');
                console.log(handledMovements);
                console.log('Getting back movement buffer...')
                session["movementId"] = handledMovements; // database schema names movements `movementId`          
            }
            catch(err) {
                console.log('Error: ', "Failed to handle sessions" );
                console.log(err);
            }
        }    
    }

    return (
        <LinearGradient
        top={aiProgram ? getGradientColors(aiProgram.programCategory.toLowerCase())[0] : "#000"}
        bottom={aiProgram ? getGradientColors(aiProgram.programCategory.toLowerCase())[1] : "#EA9CFD"}
        style={{ minHeight: "100%" }}
        >   
        <SafeAreaView>
        <View style={discoverProgramStyles.viewContainer}>
                {/* <View style={programStyles.viewContainer}> */}
                    <Text style={[programStyles.titleBarText, {color:'white', alignSelf:'center', paddingLeft:0}]}>
                        AI Create
                    </Text>
                    <Text style={[{marginLeft:20,marginTop:20, color:'white', fontSize:16, fontWeight:'bold',alignSelf:'center'}]}>
                        What are you looking for in a program?
                    </Text>
                    <TextInput
                        multiline={true}
                        style={{ marginLeft:20,marginRight:20,padding:10,minHeight: 75,  color:'white',alignSelf:'center', maxWidth:300 }}
                        onChangeText={setTextInput}
                        placeholder='Type here...'
                        placeholderTextColor='white'
                        autoFocus={true}
                        keyboardAppearance='dark'
                        selectTextOnFocus={true}
                    >
                    </TextInput>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',}}>
                    <TouchableOpacity
                        style={[{alignItems:'center',justifyContent:'center'}]}
                        onPress={handleSubmit}
                        >
                        <View
                        style={[trackingStyles.timerButton,{width:200,backgroundColor: 'rgba(0,0,0,0.3)'}]}>
                            <Text style={{color:'white', fontSize:16, fontWeight:'bold',}}>
                                Generate Program
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {aiProgram &&
                        <TouchableOpacity
                        style={[{alignItems:'center',justifyContent:'center'}]}
                        onPress={handleOnModifyPress}
                        >
                        <View
                        style={[trackingStyles.timerButton,{width:200,backgroundColor: 'rgba(0,0,0,0.3)',marginLeft:0, marginRight:20}]}>
                            <Text style={{color:'white', fontSize:16, fontWeight:'bold',}}>
                                Modify Program
                            </Text>
                        </View>
                    </TouchableOpacity>
                    }
                    </View>
                    {isGettingAiProgram &&
                        <ActivityIndicator size="large" color="#ffffff" style={{marginTop:70}}/>

                    }
                    {aiProgram &&
                        <ScrollView style={trackingStyles.sessionsContainer}>
                            <Text style={discoverProgramStyles.theProgramTitle}>
                                {aiProgram.programName}
                            </Text>
                            <Text style={[discoverProgramStyles.theProgramTitle, {fontWeight: "normal"}]}>
                                Category: {aiProgram.programCategory.toUpperCase()}
                            </Text>
                            <Text style={discoverProgramStyles.programDescription}>
                                {aiProgram.programDescription}
                            </Text>

                            {aiProgram.session.map((session: any, index:number) => (
                                <View key={index}>
                                    <Text style={discoverProgramStyles.sessionTitle}>
                                        {session.name}
                                    </Text>
                                    <View style={discoverProgramStyles.singleSessionContainer}>
                                    {session.movements.map((movement: any, index:number) => (
                                        <View key={index+10000} style={discoverProgramStyles.movementContainer}>
                                            <Text style={discoverProgramStyles.movementText}>
                                                {movement.movementName}
                                            </Text>
                                            {movement.typeTracking.trackingType === "setsreps" && (
                                                <Text style={discoverProgramStyles.movementText}>
                                                    {movement.typeTracking.sets} x {movement.typeTracking.reps}
                                                </Text>
                                            )}
                                            {movement.typeTracking.trackingType === "rounds" && (      
                                                <Text style={discoverProgramStyles.movementText}>
                                                    {movement.typeTracking.rounds}R x {movement.typeTracking.roundMin}:{movement.typeTracking.roundSec < 10 ? '0' : ''}{movement.typeTracking.roundSec}
                                                </Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                        <View style={programStyles.buttonContainer}>
                            <Button 
                                title="Add Program" 
                                color='white' 
                                onPress={handleOnPress}
                            />
                        </View>
                    </ScrollView>
                }
                {/* </View> */}
                </View>
                </SafeAreaView>
        </LinearGradient>
    );
}
