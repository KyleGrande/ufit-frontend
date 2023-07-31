import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { trackingStyles,  } from '../screens/style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../screens/UserPrograms';

type RoundsTrackerProps = {
    rounds: number;
    time: number;
    rest: number;
    movementName: string;
    // gotoTimer: (time: number, movementName: string, rounds: number) => void;
    onRoundsTrackerChange: (roundsCompleted: number, timeRemaining: number) => void;
    
}

export const RoundsTracker = ({rounds, time, rest, movementName, onRoundsTrackerChange}: RoundsTrackerProps) => {
    const [localRounds, setLocalRounds] = useState(rounds);
    const [localTime, setLocalTime] = useState(time);
    const [localRest, setLocalRest] = useState(rest);

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList, 'Track a Session'>>();

    const [completedMovements, setCompletedMovements] = useState(new Set<string>());

    const handleRoundsChange = (roundsString: string) => {
        const roundsNum = Number(roundsString);
        setLocalRounds(roundsNum);
        onRoundsTrackerChange(roundsNum, localTime);
    }

    const handleTimeChange = (timeString: string) => {
        const timeNum = Number(timeString);
        setLocalTime(timeNum);
        onRoundsTrackerChange(localRounds, timeNum);
    }

    const handleRestChange = (restString: string) => {
        const restNum = Number(restString);
        setLocalRest(restNum);
        onRoundsTrackerChange(localRounds, localTime);
    }

    const onEnd = useCallback((movement: string, roundsCompleted: number, timeRemaining: number) => {
        setCompletedMovements(prev => new Set([...prev, movement])); //update completed movements
        onRoundsTrackerChange(roundsCompleted, timeRemaining);
    }, [onRoundsTrackerChange, setCompletedMovements]);

    const gotoTimer = useCallback((time: number, movementName: string, rounds: number) => {
        navigation.navigate('TimerScreen', {time, movementName, rounds, rest: localRest, onEnd});
    }, [navigation, onEnd, localRest]);

    return (
        <View>
            <TouchableOpacity
                style = {completedMovements.has(movementName) ? [trackingStyles.timerButton, {backgroundColor: '#bbbbbb'}] : trackingStyles.timerButton}
                onPress={() => gotoTimer(localTime, movementName, localRounds)}
                disabled={completedMovements.has(movementName)}
            >
                <Text>Start</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight:20}}>
                <View style={[{flex: 1}]}>
                    <TextInput
                        style={trackingStyles.trackingTextInput}
                        onChangeText={handleTimeChange}
                        value={localTime.toString()}
                        keyboardType='numeric'
                    />
                    <Text 
                        style={trackingStyles.trackingTextInputName}>
                            Time
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
                        style={trackingStyles.trackingTextInput}
                        onChangeText={handleRestChange}
                        value={localRest.toString()}
                        keyboardType='numeric'
                    />
                    <Text 
                        style={trackingStyles.trackingTextInputName}>
                            Rest
                    </Text>
                </View>
            </View>
        </View>
    );
}