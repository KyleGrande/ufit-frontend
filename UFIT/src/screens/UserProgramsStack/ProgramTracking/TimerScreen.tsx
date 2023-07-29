import React, {useEffect, useState} from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../../UserPrograms";
import LinearGradient from "../../../components/LinearGradient";
import { timerStyles } from '../../style';


export type TimerScreenRouteProp = RouteProp<StackParamList, 'TimerScreen'>;

type TimerScreenProps = {
    route: TimerScreenRouteProp;
    navigation: NativeStackNavigationProp<StackParamList, 'User Programs'>;
};

export default function TimerScreen({route, navigation}: TimerScreenProps){
    const {time} = route.params;
    const {rounds} = route.params;
    const {movementName} = route.params;
    const [seconds, setSeconds] = useState(time); 
    const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {
        let timer: any;
        if (isRunning && seconds > 0) {
            timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        }
        return () => clearTimeout(timer);
        
    }, [seconds, isRunning]);

    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = Math.floor(seconds % 60);
    
    return (
        <LinearGradient
        top="#404040"
        bottom="#252525"
        style={{ minHeight: "100%" }}
        >
        <View style={[timerStyles.viewContainer, {justifyContent:'space-evenly'}]}>
            <Text style={{
            color:'white', 
            fontSize: 80, 
            letterSpacing: 1.5, 
            fontWeight: 'bold', 
            shadowColor: 'gray', 
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.5,
            shadowRadius: 2
        }}>  
            0 / {rounds}
        </Text>
        <Text style={{
            color:'white', 
            fontSize: 100, 
            letterSpacing: 1.5, 
            fontWeight: 'bold', 
            shadowColor: 'gray', 
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.5,
            shadowRadius: 2
        }}>            
            {/* {seconds} */}
            {displayMinutes}:{displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
        </Text>
        <TouchableOpacity
            style={{padding:20, borderRadius: 10}}
            onPress={() => setIsRunning(!isRunning)}
        >
            <Text style={{color: 'white', fontSize: 40, letterSpacing: 1.5, fontWeight:'bold',             shadowColor: 'gray', 
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.4,
            shadowRadius: 2}}>
                {isRunning ? 'Stop' : 'Start'}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={{padding:20, borderRadius: 10}}
                onPress = {() => navigation.goBack()}
            >
                            <Text style={{color: 'white', fontSize: 40, letterSpacing: 1.5, fontWeight:'bold',             shadowColor: 'gray', 
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.4,
            shadowRadius: 2}}>
                Submit
                </Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
    );
}