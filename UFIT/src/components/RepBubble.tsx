import React, {useState} from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { repBubbleStyles } from '../screens/style';

const states = ['inital', 'pass', 'fail'];
const colors: {[key: string]: string} = {inital: 'white', pass: '#1BC300', fail: 'red'};

export default function RepBubble() {
    const [state, setState] = useState(states[0]);

    const handleTap = () => {
        const index = states.indexOf(state);
        const nextIndex = (index + 1) % states.length;
        setState(states[nextIndex]);
    }

    return (
        <TouchableOpacity onPress={handleTap}>
            <View style={[repBubbleStyles.bubble, {backgroundColor: colors[state]}]}>
                {/* <Text>{state}</Text> */}
            </View>
        </TouchableOpacity>
    );
}