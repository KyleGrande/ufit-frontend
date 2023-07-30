import React, {useEffect, useState} from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";

import { repBubbleStyles, trackingStyles } from '../screens/style';
import RepBubble from '../components/RepBubble';
const states = ['', 'pass', 'fail'];

type RepSetsTrackerProps = {
    movement: any;
    sets: number;
    reps: number;
    weight: number;
    onRepSetTrackerChange: (setsCompleted: number, weight: number, reps:number) => void;

}

export const RepSetsTracker = ({movement, sets, reps, weight, onRepSetTrackerChange}: RepSetsTrackerProps) => {
    const [repStates, setRepStates] = useState<string[]>([...Array(sets)].map(() => ''));
    const [localSets, setLocalSets] = useState(sets || 0);
    const [localWeight, setLocalWeight] = useState(weight || 0);
    const [localReps, setLocalReps] = useState(reps || 0);

    const handleStateChange = (index: number) => {

        const newStates = [...repStates]; //create copy ofrepStates
        const currentStateIndex = states.indexOf(newStates[index]); //get index of current state
        const nextState = states[(currentStateIndex + 1) % states.length]; //get next state
        newStates[index] = nextState; //set new state

        setRepStates(newStates); //update state
        const setsCompleted = newStates.filter(state => state === 'pass').length; //count number of sets completed
        onRepSetTrackerChange(setsCompleted, localWeight, localReps); //call callback function
    }

    const handleWeightChange = (weightString: string) => {
        const weightNum = Number(weightString);
        setLocalWeight(weightNum);
        onRepSetTrackerChange(repStates.filter(state => state === 'pass').length, localWeight, localReps);
        console.log(localWeight);
    }

    const handleRepsChange = (repsString: string) => {
        const repsNum = Number(repsString);
        setLocalReps(repsNum);        
        onRepSetTrackerChange(repStates.filter(state => state === 'pass').length, localWeight, localReps);
        console.log(localReps);
    }

    const handleSetsChange = (setsString: string) => {
        const setsNum = Number(setsString);
        setLocalSets(setsNum);
        const newStates = [...Array(setsNum)].map(() => '');
        setRepStates(newStates);

        onRepSetTrackerChange(repStates.filter(state => state === 'pass').length, localWeight, localReps);
        console.log(localSets);
    }

    return (
        <View>
        <View style={trackingStyles.bubbleContainer}>
        {repStates.map((state, index) => 
            <RepBubble key={index} state={state} onStateChange={() => handleStateChange(index)} />
        )}
        </View>
        <View style={[{ flexDirection:'row', flex:1, marginRight:20}]}>
        <View style={[{flex:1}]}>
        <TextInput
            selectTextOnFocus={true}
            
            style={[trackingStyles.movementName, {borderBottomColor:'white', borderBottomWidth: 1, alignContent:'center', textAlign:'center', marginBottom: 0, paddingBottom:0}]}
            onChangeText={handleSetsChange}
            value={localSets.toString()}
            keyboardType='numeric'
        />
        <Text style={[trackingStyles.movementName, {fontSize:12, marginTop:0, textAlign:'center'}]}>Sets</Text>

        </View>
        <View style={[{flex:1}]}>
        <TextInput
            
            style={[trackingStyles.movementName, {borderBottomColor:'white', borderBottomWidth: 1, alignContent:'center', textAlign:'center', marginBottom: 0, paddingBottom:0}]}
            onChangeText={handleRepsChange}
            value={localReps.toString()}
            keyboardType='numeric'
        />
        <Text style={[trackingStyles.movementName, {fontSize:12, marginTop:0, textAlign:'center'}]}>Reps</Text>

        </View>
        <View style={[{flex:1}]}>
        <TextInput
                    selectTextOnFocus={true}

            style={[trackingStyles.movementName, {borderBottomColor:'white', borderBottomWidth: 1, alignContent:'center', textAlign:'center', marginBottom: 0, paddingBottom:0}]}
            onChangeText={handleWeightChange}
            value={localWeight.toString()}
            keyboardType='numeric'
        />
        <Text style={[trackingStyles.movementName, {fontSize:12, marginTop:0, textAlign:'center'}]}>Weight</Text>

        </View>
        </View>
    </View>
    );
}