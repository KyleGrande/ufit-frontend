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
import ProgramEditMovementScreen from "./UserProgramsStack/ProgramEditStack/ProgramEditMovement";
import ProgramAddMovementScreen from "./UserProgramsStack/ProgramEditStack/ProgramAddMovement";
import ProgramWriteFeedBack from "./UserProgramsStack/ProgramFeedback/WriteProgramFeedback";
import ProgramAddSession from "./UserProgramsStack/ProgramEditStack/ProgramAddSession";
import ProgramAddSessionMovement from "./UserProgramsStack/ProgramEditStack/ProgramAddSessionMovement";
import { Program, Session, Movement } from "../api";
import FormProvider from "./StateContext";
import TimerScreen from "./UserProgramsStack/ProgramTracking/TimerScreen";
import AICreate from "./UserProgramsStack/AICreate"
export type StackParamList = {
  "User Programs": undefined; // will be UserPrograms from the DB eventually
  "AI Create": undefined; //takes nothing maybe userID?
  "Create a Program": undefined; //takes nothing maybe userID?
  "Create a Session": { fields: any; addSession: any; deleteSession: any }; //takes a session object maybe in the future userID?
  "Create a Movement": {
    addMovement: any;
    removeMovement: any;
    fields: any;
    addSession: any;
    deleteSession: any;
  };
  "Track a Program": {
    program: Program;
  }; //takes a program object maybe in the future userID?
  "Track a Session": {
    program: Program;
    session: Session;
    movements: Movement[];    
  }; //takes a session object maybe in the future userID?
  TimerScreen: {
    movementName: string;
    roundMin: number;
    roundSec: number;
    rounds: number;
    restMin: number;
    restSec: number;
    onEnd: (
      movement: string,
      roundsCompleted: number,
      timeRemaining: number
    ) => void;
  };
  "Edit Program Movement": {
    movement:any,
    program: any
  };
  "Write Feedback": {
    programId: string,
    userId: string
  };
  "Add Movement Tracking":{
    program: any,
    session: any,
  };
  "Program Add Session":{
    program: any
  }
  "Program Add Session Movement":{
    addMovement: any,
  }
};
// Login: { setIsLoggedIn: (value: boolean) => void };

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
        name="AI Create"
        component={AICreate}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
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
        initialParams={{
          addMovement: (value: any) => {
            console.log(value);
          },
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
        options={({ route }) => ({
          title: route.params.session.name,
          headerTransparent: true,
          headerTintColor: "white",
        })}
      />

      <stack.Screen
        name="TimerScreen"
        component={TimerScreen}
        options={{
          presentation: "modal",
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
        }}
      />

      <stack.Screen
        name="Edit Program Movement"
        component={ProgramEditMovementScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name = "Add Movement Tracking"
        component={ProgramAddMovementScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name = "Program Add Session"
        component={ProgramAddSession}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name = "Program Add Session Movement"
        component={ProgramAddSessionMovement}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name = "Write Feedback"
        component = {ProgramWriteFeedBack}
        options= {{
          presentation: "modal",
          headerShown: false,
        }}
        />
    </stack.Navigator>
  );
}
