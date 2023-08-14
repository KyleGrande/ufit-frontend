import React, {useCallback, useEffect, useState} from "react";
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


    useEffect(()=> {
        setLocalSets(sets || 0);
        setRepStates([...Array(sets)].map(()=>'') || []);
    }, [sets])
    useEffect(()=> {
        setLocalReps(reps || 0)
    }, [reps])
    useEffect(()=> {
        setLocalWeight(weight || 0);
    }, [weight])
    

    const callOnSetRepTrackerChange = useCallback(() => { //needed callback on setRepTrackerChange to only change when repStates changes
        const setsCompleted = repStates.filter(state => state === 'pass').length;
        onRepSetTrackerChange(setsCompleted, localWeight, localReps);
    }, [repStates, localWeight, localReps]);
    
    useEffect(() => {  //needed to call onSetRepTrackerChange when component mounts to set initial values
        callOnSetRepTrackerChange();
    }, [callOnSetRepTrackerChange]);

    const handleStateChange = (index: number) => {
        const newStates = [...repStates]; //create copy ofrepStates
        const currentStateIndex = states.indexOf(newStates[index]); //get index of current state
        const nextState = states[(currentStateIndex + 1) % states.length]; //get next state
        newStates[index] = nextState; //set new state
        setRepStates(newStates); //update state
        callOnSetRepTrackerChange();
    }

    const handleSetsChange = (setsString: string) => {
        const setsNum = Number(setsString);
        setLocalSets(setsNum);
        const newStates = [...Array(setsNum)].map(() => '');
        setRepStates(newStates);
        callOnSetRepTrackerChange();
    }

    const handleRepsChange = (repsString: string) => {
        const repsNum = Number(repsString);
        setLocalReps(repsNum);        
        callOnSetRepTrackerChange();
    }

    const handleWeightChange = (weightString: string) => {
        const weightNum = Number(weightString);
        setLocalWeight(weightNum);
        callOnSetRepTrackerChange();
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
            style={trackingStyles.trackingTextInput}
            onChangeText={handleSetsChange}
            value={localSets.toString()}
            keyboardType='numeric'
        />
        <Text style={trackingStyles.trackingTextInputName}>Sets</Text>

        </View>
            <View style={[{flex:1}]}>
                <TextInput
                    style={trackingStyles.trackingTextInput}
                    onChangeText={handleRepsChange}
                    value={localReps.toString()}
                    keyboardType='numeric'
                />
                <Text style={trackingStyles.trackingTextInputName}>Reps</Text>
            </View>
            <View style={[{flex:1}]}>
                <TextInput
                    selectTextOnFocus={true}
                    style={trackingStyles.trackingTextInput}
                    onChangeText={handleWeightChange}
                    value={localWeight.toString()}
                    keyboardType='numeric'
                />
                <Text style={trackingStyles.trackingTextInputName}>Weight</Text>
            </View>
        </View>
    </View>
    );
}