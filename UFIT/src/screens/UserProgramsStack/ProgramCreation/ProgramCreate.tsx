import React from "react";
import { Text, View } from "react-native";
import {creatingStyles} from '../../style';

export default function ProgramCreate() {
    return (
        <View style={creatingStyles.viewContainer}>
            <Text>
                One day
            </Text>
            <Text>
                You'll be able to create here
            </Text>
        </View>
    );
}