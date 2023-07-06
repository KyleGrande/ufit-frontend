import * as React from 'react';
import { Text, View, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../UserPrograms';
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
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Zen Balance",
        "programDescription":"A yoga program focused on balance and mindfulness.",
        "programCategory":"yoga",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Cardio Rush",
        "programDescription":"Intense cardio workouts to get your heart pumping.",
        "programCategory":"cardio",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ed"},
        "programName":"Pilates Pro",
        "programDescription":"A challenging Pilates program for experienced practitioners.",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ee"},
        "programName":"Barbell Buster",
        "programDescription":"A challenging Pilates program for experienced practitioners.",
        "programCategory":"pilates",
        "userId":{"$oid":"64a1d8706724507e67f033e9"},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64a1d8b16724507e67f033ae"},
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
            <View style={styles.container}>
            <Text style={styles.headerText}>
                Your Programs
            </Text>
            <ScrollView style={styles.programsContainer}>
                {programs.map((program, index) => (
                    <Pressable
                    style={[styles.programsContainer2, {backgroundColor: index % 2 === 0 ? 'orange' : 'blue'}]}  
                    key={program._id.$oid}
                        onPress={() =>
                            navigation.navigate('Track a Program', { programId: program._id.$oid }) }
                    >
                    {/* <View style={styles.programsContainer}> */}
                        <Text style={{fontSize: 20, color: 'white', padding: 5, fontWeight: 'bold'}}>{program.programName}</Text>
                        {/* <Text>{program.programDescription}</Text> */}
                    {/* </View> */}
                    </Pressable>
                ))}
            </ScrollView>
            <View style={styles.containerItem}>
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

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        // paddingLeft: 20,
        height: '100%',
    },
    programsContainer: {
        width: '100%',
        // height: '80%',
        marginTop: 20,
        // marginBottom: 40,
        paddingRight: 40,
        paddingLeft: 40,
        // textAlign: 'left',
        // backgroundColor: 'orange',
    },
    programsContainer2: {
        // flex: 1,
        // flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 70,
        // width: 350,
        marginTop: 20,
        // marginBottom: 20,
        // textAlign: 'left',
        // backgroundColor: 'orange',
        borderRadius: 10,
        paddingLeft: 10,
    },
    programsContainer3: {
        // flex: 1,
        // flexDirection: 'column',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        // height: 100,
        // width: 350,
        // marginTop: 20,
        // marginBottom: 20,
        // textAlign: 'left',
        // backgroundColor: 'orange',
    },
    containerItem: {
        // flex: 1,
        // flexDirection: 'row',
        // backgroundColor: 'black',
        // width: 250,
        // height: 50,
        // marginLeft: '17%',
        // paddingLeft: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderRadius: 10,
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        paddingLeft: 20,
        color: 'gray',
        fontSize: 30,
        fontWeight: 'bold',

    },
    buttonCreate: {
        // backgroundColor: 'orange',
        // width: 350,
        // height: 200,
    },
});