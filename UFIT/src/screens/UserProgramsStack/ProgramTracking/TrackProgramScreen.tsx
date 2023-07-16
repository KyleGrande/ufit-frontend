import React from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../../UserPrograms";
import { trackingStyles } from "../../style";
import { Session } from "../ProgramsMainScreen";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import LinearGradient from "../../../component/LinearGradient";
// import LinearGradient from "react-native-linear-gradient";

// used for accessing route parameters in a type-safe way
export type TrackProgramScreenRouteProp = RouteProp<
  StackParamList,
  "Track a Program"
>;

type TrackProgramScreenProps = {
  route: TrackProgramScreenRouteProp;
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function TrackProgramScreen({
  route,
  navigation,
}: TrackProgramScreenProps) {
  const { program } = route.params;

  return (
    <LinearGradient
      top="#2E34BC"
      bottom="#EA9CFD"
      style={{ minHeight: "100%" }}
    >
      {/* <View style={trackingStyles.viewContainer}> */}
      <View style={{ paddingTop: 100 }}>
        <Text style={trackingStyles.titleBarText}>{program?.programName}</Text>

        <ScrollView
          style={{
            ...trackingStyles.sessionsContainer,
            ...trackingStyles.grow,
            minHeight: "100%",
          }}
        >
          {program?.session?.map((session: Session) => (
            <Pressable
              key={session._id}
              style={trackingStyles.singleSessionContainer}
              onPress={() =>
                navigation.navigate("Track a Session", { session })
              }
            >
              <Text style={trackingStyles.sessionTitle}>{session?.name}</Text>
              {session?.movementId?.map((movementId) => (
                <Text key={movementId}>{movementId}</Text>
              ))}
            </Pressable>
          )) || <Text>No data</Text>}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
