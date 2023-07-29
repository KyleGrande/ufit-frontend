import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverHomeScreen from "./DiscoverStack/DiscoverHomeScreen";
import DiscoverProgramScreen from "./DiscoverStack/DiscoverProgramScreen";
import { Program } from "../api";

export type StackParamList = {
  "Discover": undefined; 
  "Program": { program: Program };
};

const stack = createNativeStackNavigator<StackParamList>();

export default function UserPrograms() {
  return (
    <stack.Navigator initialRouteName="Discover">
        <stack.Screen
            name="Discover"
            component={DiscoverHomeScreen}
            options={{
                headerTransparent: true,
                headerTintColor: "white",
                headerShown: false,             
            }}
        />
        <stack.Screen
            name="Program"
            component={DiscoverProgramScreen}
            options={{
                headerTransparent: true,
                headerTintColor: "white",
                headerTitle: "",
            }}
        />

    </stack.Navigator>
    );
}
