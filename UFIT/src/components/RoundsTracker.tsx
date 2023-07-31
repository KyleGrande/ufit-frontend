import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { trackingStyles,  } from '../screens/style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../screens/UserPrograms';

type RoundsTrackerProps = {
    movementName: string;
    roundMin: number;
    roundSec: number;
    rounds: number;
    restMin: number;
    restSec: number;
    // gotoTimer: (time: number, movementName: string, rounds: number) => void;
    onRoundsTrackerChange: (roundsCompleted: number, roundMinRemain: number, roundSecRemain: number) => void;
    
}

export const RoundsTracker = ({rounds, roundMin, roundSec, restMin,restSec, movementName, onRoundsTrackerChange}: RoundsTrackerProps) => {
    const [localRounds, setLocalRounds] = useState(rounds);
    const [localRoundMin, setLocalRoundMin] = useState(roundMin);
    const [localRoundSec, setLocalRoundSec] = useState(roundSec);
    const [localRestMin, setLocalRestMin] = useState(restMin);
    const [localRestSec, setLocalRestSec] = useState(restSec);

    // const [localTime, setLocalTime] = useState(time);
    // const [localRest, setLocalRest] = useState(rest);
    

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList, 'Track a Session'>>();

    const [completedMovements, setCompletedMovements] = useState(new Set<string>());


    const handleRoundsChange = (roundsString: string) => {
        const roundsNum = Number(roundsString);
        setLocalRounds(roundsNum);
        // onRoundsTrackerChange(roundsNum, localTime);
    }

    const handleRoundMinChange = (roundMinString: string) => {
        const roundMinNum = Number(roundMinString);
        setLocalRoundMin(roundMinNum);
    }
    
    const handleRoundSecChange = (roundSecString: string) => {
        const roundSecNum = Number(roundSecString);
        setLocalRoundSec(roundSecNum);
    }

    const handleRestMinChange = (restMinString: string) => {
        const restMinNum = Number(restMinString);
        setLocalRestMin(restMinNum);
    }

    const handleRestSecChange = (restSecString: string) => {
        const restSecNum = Number(restSecString);
        setLocalRestSec(restSecNum);
    }


    const onEnd = useCallback((movement: string, roundsCompleted: number, timeRemaining: number) => {
        setCompletedMovements(prev => new Set([...prev, movement])); //update completed movements
        let roundMinRemain = 0;
        let roundSecRemain = 0;
        if (timeRemaining > 59) {
            roundMinRemain = Math.floor(timeRemaining / 60);
            roundSecRemain = timeRemaining % 60;
        } else {
            roundMinRemain = 0;
            roundSecRemain = timeRemaining;
        }
        onRoundsTrackerChange(roundsCompleted, roundMinRemain, roundSecRemain);
    }, [onRoundsTrackerChange, setCompletedMovements]);

    const gotoTimer = useCallback((movementName: string, roundMin: number, roundSec:number, rounds: number, restMin:number,restSec:number) => {
        navigation.navigate('TimerScreen', {movementName, roundMin, roundSec, rounds, restMin, restSec, onEnd});
    }, [navigation, onEnd, localRoundMin, localRoundSec, localRestMin, localRestSec, localRounds]);

    return (
        <View>
            <TouchableOpacity
                style = {completedMovements.has(movementName) ? [trackingStyles.timerButton, {backgroundColor: '#bbbbbb'}] : trackingStyles.timerButton}
                onPress={() => gotoTimer(movementName, localRoundMin, localRoundSec, localRounds, localRestMin, localRestSec)}
                disabled={completedMovements.has(movementName)}
            >

                <Text>Start</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight:20}}>
                <View style={[{flex: 1}]}>
                    <TextInput
                        selectTextOnFocus={true}
                        style={trackingStyles.trackingTextInput}
                        onChangeText={handleRoundMinChange}
                        value={localRoundMin.toString()}
                        keyboardType='numeric'
                    />
                    <Text 
                        style={trackingStyles.trackingTextInputName}>
                            Round Minutes
                    </Text>
                </View>
                
                <View style={[{flex: 1}]}>
                    <TextInput
                        selectTextOnFocus={true}
                        style={trackingStyles.trackingTextInput}
                        onChangeText={handleRoundSecChange}
                        value={localRoundSec.toString()}
                        keyboardType='numeric'
                    />
                    <Text 
                        style={trackingStyles.trackingTextInputName}>
                            Round Seconds
                    </Text>
                </View>
                <View style={[{flex: 1}]}>
                    <TextInput
                        selectTextOnFocus={true}
                        style={trackingStyles.trackingTextInput}
                        onChangeText={handleRoundsChange}
                        value={localRounds.toString()}
                        keyboardType='numeric'
                    />
                    <Text
                        style={trackingStyles.trackingTextInputName}>
                            Rounds
                    </Text>
                </View>
                <View style={[{flex: 1}]}>
                    <TextInput
                        selectTextOnFocus={true}
                        style={trackingStyles.trackingTextInput}
                        onChangeText={handleRestMinChange}
                        value={localRestMin.toString()}
                        keyboardType='numeric'
                    />
                    <Text 
                        style={trackingStyles.trackingTextInputName}>
                            Rest Minutes
                    </Text>
                </View>
                <View style={[{flex: 1}]}>
                    <TextInput
                        selectTextOnFocus={true}
                        style={trackingStyles.trackingTextInput}
                        onChangeText={handleRestSecChange}
                        value={localRestSec.toString()}
                        keyboardType='numeric'
                    />
                    <Text 
                        style={trackingStyles.trackingTextInputName}>
                            Rest Seconds
                    </Text>
                </View>
            </View>
        </View>
    );
}
