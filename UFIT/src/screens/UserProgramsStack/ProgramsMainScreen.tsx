import * as React from 'react';
import { Text, View, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserPrograms';
import {programStyles} from '../style';
//dummy data
const programs = [
    {
        "_id":{"$oid":"64a1d8866724507e67f033eb"},
        "programName":"Strength 5x5",
        "programDescription":"A high intensity strength building program.",
        "programCategory":"strength training",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8a16724507e67f033ec"},
        "programName":"Monster Builder",
        "programDescription":"An extreme program for muscle growth and power.",
        "programCategory":"bodybuilding",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Lean Machine",
        "programDescription":"Shed fat and build lean muscle with this program.",
        "programCategory":"weight loss",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ef"},
        "programName":"Zen Balance",
        "programDescription":"A yoga program focused on balance and mindfulness.",
        "programCategory":"yoga",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033eh"},
        "programName":"Cardio Rush",
        "programDescription":"Intense cardio workouts to get your heart pumping.",
        "programCategory":"cardio",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ei"},
        "programName":"Pilates Pro",
        "programDescription":"A challenging Pilates program for experienced practitioners.",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ej"},
        "programName":"Barbell Buster",
        "programDescription":"A challenging Pilates program for experienced practitioners.",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ek"},
        "programName":"Chin-up Champion",
        "programDescription":"A challenging Pilates program for experienced practitioners.",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
]
// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function ProgramsMainScreen({ navigation }: ProgramsMainScreenProps){
    return (
        <View>
            <View style={programStyles.viewContainer}>
                <Text style={programStyles.titleBarText}>
                    Your Programs
                </Text>
                <ScrollView style={programStyles.programsContainer}>
                    {programs.map((program, index) => (
                        <Pressable
                            style={[programStyles.singleProgramContainer, 
                                {backgroundColor: index % 2 === 0 ? 'orange' : 'blue'}]}  
                            key={program._id.$oid}
                            onPress={() => navigation.navigate('Track a Program',
                                { programId: program._id.$oid })}
                        >
                            <Text style={programStyles.programTitle}>
                                {program.programName}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <View style={programStyles.buttonContainer}>
                    <Button 
                        title="Create Program" 
                        color='orange' 
                        onPress={() => 
                            navigation.navigate('Create a Program')} 
                    />
                </View>
            </View>
        </View>
    );
}

