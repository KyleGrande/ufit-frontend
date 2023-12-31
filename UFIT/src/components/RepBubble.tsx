import React, {useState} from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { repBubbleStyles } from '../screens/style';

const colors: {[key: string]: string} = {inital: '', pass: '#1BC300', fail: 'red'};
type RepBubbleProps = {
    state: string,
    onStateChange: () => void
};
export default function RepBubble(props: RepBubbleProps) {
    const { state, onStateChange } = props;

    return (
        <TouchableOpacity onPress={onStateChange} style={[{}]}>
            <View style={[repBubbleStyles.bubble, {flexShrink:1,backgroundColor: colors[state]}]} />
        </TouchableOpacity>
    );
}