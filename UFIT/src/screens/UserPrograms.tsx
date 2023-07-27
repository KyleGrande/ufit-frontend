import * as React from "react";
// import { Text, View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import ProgramCreate from "./UserProgramsStack/ProgramCreation/ProgramCreate";
import ProgramSessionCreate from "./UserProgramsStack/ProgramCreation/ProgramSessionCreate";
import ProgramMovementCreate from "./UserProgramsStack/ProgramCreation/ProgramMovementCreate";
import ProgramsMainScreen from "./UserProgramsStack/ProgramsMainScreen";
import TrackProgramScreen from "./UserProgramsStack/ProgramTracking/TrackProgramScreen";
import TrackSessionScreen from "./UserProgramsStack/ProgramTracking/TrackSessionScreen";
import { Program, Session } from "../api";
import  FormProvider  from "./StateContext";
export type StackParamList = {
  "User Programs": undefined; // will be UserPrograms from the DB eventually
  "Create a Program": undefined; //takes nothing maybe userID?
  "Create a Session": { addSession: any };
  "Create a Movement": { addMovement: any };
  "Track a Program": { program: Program }; //takes a program object maybe in the future userID?
  "Track a Session": { session: Session }; //takes a session object maybe in the future userID?
};

const stack = createNativeStackNavigator<StackParamList>();

export default function UserPrograms() {
  return (
    <stack.Navigator initialRouteName="User Programs">
      <stack.Screen
        name="User Programs"
        component={ProgramsMainScreen}
        options={{
          headerShown: false,
        }}
      />
            
      <stack.Screen 
      name="Create a Program"
      options={{
        headerTransparent: true,
        headerTintColor: "white",
      }}
      > 
        {(props) => (
          <FormProvider>
            <ProgramCreate {...props}></ProgramCreate>
          </FormProvider>
        )}           
      </stack.Screen>

      <stack.Screen
        name="Create a Session"        
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      >
        {(props) => (
          <FormProvider>
            <ProgramSessionCreate {...props}></ProgramSessionCreate>
          </FormProvider>
        )} 
        </stack.Screen>

      <stack.Screen
        name="Create a Movement"        
        options={{
          headerTransparent: true,
          headerTintColor: "white",
        }}
      >
        {(props) => (
          <FormProvider>
            <ProgramMovementCreate {...props}></ProgramMovementCreate>
          </FormProvider>
        )} 
      </stack.Screen>

      <stack.Screen
        name="Track a Program"
        component={TrackProgramScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
        }}
      />
      
      <stack.Screen
        name="Track a Session"
        component={TrackSessionScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
        }}
      />
    </stack.Navigator>
  );
}
