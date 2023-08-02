import * as React from 'react';
import { Text, View, Button, ScrollView, Pressable, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserPrograms';
import {programStyles, trackingStyles, discoverProgramStyles} from '../style';
import API, { Program, Session } from '../../api';
import axios from 'axios';
import LinearGradient from '../../components/LinearGradient';
import { getGradientColors } from '../../components/getGradient';
// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function AICreate({ navigation }: ProgramsMainScreenProps){
    const [textInput, setTextInput] = React.useState<string>('');
    const [aiProgram, setAiProgram] = React.useState<any>();
    const handleSubmit = () => {
        console.log(textInput);
    
        axios.post('http://localhost:3003/', {
            text: textInput
        })
        .then(response => {
            console.log(response.data);
            setAiProgram(response.data);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleOnPress = async () => {
        let newProgram = {...aiProgram};
        try {
            // Handle sessions and movements
            await handleSessions(newProgram);
            // Once done, add the program
            let response = await API.addProgram(newProgram);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    }
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
        top={aiProgram ? getGradientColors(aiProgram.programCategory)[0] : "#000"}
        bottom={aiProgram ? getGradientColors(aiProgram.programCategory)[1] : "#EA9CFD"}
        style={{ minHeight: "100%" }}
        >   
                <View style={programStyles.viewContainer}>
                    <Text style={[programStyles.titleBarText, {color:'white', alignSelf:'center'}]}>
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
                    >
                    </TextInput>
                    <TouchableOpacity
                        style={[{alignItems:'center',justifyContent:'center'}]}
                        onPress={handleSubmit}
                        >
                        <View
                        style={[trackingStyles.timerButton,{width:200}]}>
                            <Text style={{color:'black', fontSize:16, fontWeight:'bold'}}>
                                Generate Program
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {aiProgram &&
                        <ScrollView style={trackingStyles.sessionsContainer}>
                            <Text style={discoverProgramStyles.theProgramTitle}>
                                {aiProgram.programName}
                            </Text>
                            <Text style={discoverProgramStyles.programDescription}>
                                {aiProgram.programDescription}
                            </Text>

                            {aiProgram.session.map((session: any) => (
                                <View key={session}>
                                    <Text style={discoverProgramStyles.sessionTitle}>
                                        {session.name}
                                    </Text>
                                    <View style={discoverProgramStyles.singleSessionContainer}>
                                    {session.movements.map((movement: any) => (
                                        <View key={movement.movementName} style={discoverProgramStyles.movementContainer}>
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
                                color='orange' 
                                onPress={handleOnPress}
                            />
                        </View>
                    </ScrollView>
                }
                </View>
        </LinearGradient>
    );
}
