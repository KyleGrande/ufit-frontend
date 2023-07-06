import * as React from 'react';
import { Text, View, Button, StyleSheet, Pressable } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

//dummy data
const programs = [
    {
        "_id":{"$oid":"64a1d8866724507e67f033eb"},
        "programName":"Strength 5x5",
        "programDescription":"Work Hard UFIT",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8a16724507e67f033ec"},
        "programName":"Monster Builder",
        "programDescription":"Work Hard UFIT",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Monster Builder",
        "programDescription":"Work Hard UFIT",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Monster Builder",
        "programDescription":"Work Hard UFIT",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Monster Builder",
        "programDescription":"Work Hard UFIT",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Monster Builder",
        "programDescription":"Work Hard UFIT",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Monster Builder",
        "programDescription":"Work Hard UFIT",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
]

type StackParamList = {
    'User Programs': undefined;
    'Create a Program': undefined;
    'Track a Program': { programId: string };
};

type ProgramsMainScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function ProgramsMainScreen({ navigation }: ProgramsMainScreenProps){
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Your Programs
            </Text>
            <View style={styles.programsContainer}>
                {programs.map((program) => (
                    <Pressable
                        style={styles.programsContainer2}  
                        key={program._id.$oid}
                        onPress={() =>
                            navigation.navigate('Track a Program', { programId: program._id.$oid }) }
                    >
                    <View>
                        <Text style={{fontSize: 30}}>{program.programName}</Text>
                        <Text>{program.programDescription}</Text>
                    </View>
                    </Pressable>
                ))}
            </View>
            <View style={styles.containerItem}>
                <Button 
                    title="Create Program" 
                    color='orange' 
                    onPress={() => 
                        navigation.navigate('Create a Program')} 
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    programsContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        // height: 100,
        width: 350,
        marginTop: 20,
        marginBottom: 20,
        // textAlign: 'left',
        // backgroundColor: 'orange',
    },
    programsContainer2: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minHeightheight: 50,
        width: 350,
        marginTop: 20,
        marginBottom: 20,
        // textAlign: 'left',
        backgroundColor: 'orange',
    },
    containerItem: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 250,
        height: 50,
        marginTop: 40,
        marginBottom: 40,
        marginLeft: '17%',
        // paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    headerText: {
        color: 'gray',
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonCreate: {
        backgroundColor: 'orange',
        width: 350,
        height: 200,
    },
});