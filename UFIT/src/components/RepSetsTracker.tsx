import React, {useEffect, useState} from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { repBubbleStyles, trackingStyles } from '../screens/style';
import RepBubble from '../components/RepBubble';
const states = ['', 'pass', 'fail'];

type RepSetsTrackerProps = {
    movement: any;
    sets: number;
    reps: number;
    weight: number;
    onRepSetTrackerChange: (repsCompleted: number) => void;

}

export const RepSetsTracker = ({movement, sets, reps, weight, onRepSetTrackerChange}: RepSetsTrackerProps) => {
    const [repStates, setRepStates] = useState<string[]>([...Array(sets)].map(() => ''));

    const handleStateChange = (index: number) => {

        const newStates = [...repStates]; //create copy ofrepStates
        const currentStateIndex = states.indexOf(newStates[index]); //get index of current state
        const nextState = states[(currentStateIndex + 1) % states.length]; //get next state
        newStates[index] = nextState; //set new state

        setRepStates(newStates); //update state
        const setsCompleted = newStates.filter(state => state === 'pass').length; //count number of sets completed
        onRepSetTrackerChange(setsCompleted); //call callback function
    }


    return (
        <View style={trackingStyles.bubbleContainer}>
        {repStates.map((state, index) => 
            <RepBubble key={index} state={state} onStateChange={() => handleStateChange(index)} />
        )}
    </View>
    );
}