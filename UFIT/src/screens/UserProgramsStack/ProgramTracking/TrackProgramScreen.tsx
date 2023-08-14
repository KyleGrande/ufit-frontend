import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackParamList } from "../../UserPrograms";
import LinearGradient from "../../../components/LinearGradient";
import { getGradientColors } from "../../../components/getGradient";

import API, { Session, Movement } from "../../../api";
import { trackingStyles, discoverProgramStyles } from "../../style";
import { useMovementsContext } from "../../MovementsContext";

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
  const { movements, handleMovements } = useMovementsContext();
  
  useEffect(() => {
    handleMovements(program);
  }, [program]);



  return (
    <LinearGradient
      top={getGradientColors(program.programCategory.toLowerCase())[0]}
      bottom={getGradientColors(program.programCategory.toLowerCase())[1]}
      style={{ minHeight: "100%" }}
    >
      <View style={trackingStyles.viewContainer}>
        <Text style={trackingStyles.titleBarText}>{program.programName}</Text>
        
        <ScrollView style={trackingStyles.sessionsContainer}>
          {program.session.map((session: Session, index) => (
            <View key={index}>
              <Text style={discoverProgramStyles.sessionTitle}>
                {session.name}
              </Text>
              <TouchableOpacity
                key={session._id}
                style={discoverProgramStyles.singleSessionContainer}
                onPress={() => {
                  {
                    // Get the movements that correspond to the movementIds in the session
                    const sessionMovements = session.movementId
                      ?.map((movementId) =>
                        movements.find((m) => m._id === movementId)
                      )
                      .filter(Boolean) as Movement[];
                    navigation.navigate("Track a Session", {
                      program,
                      session,
                      movements: sessionMovements,                      
                    });
                  }
                }}
              >
                {session.movementId?.map((movementId, index) => {
                  // Find the movement that corresponds to the movementId in the session
                  const movement = movements.find((m) => m._id === movementId);
                  return movement ? (
                    <View
                      style={discoverProgramStyles.movementContainer}
                      key={index + 10000}
                    >
                      <Text style={discoverProgramStyles.movementText}>
                        {movement.movementName}
                      </Text>
                      <Text style={discoverProgramStyles.movementText}>
                        {movement.typeTracking.trackingType === "setsreps"
                          ? `${movement.typeTracking.sets} x ${movement.typeTracking.reps}`
                          : `${movement.typeTracking.rounds}R x ${
                              movement.typeTracking.roundMin
                            }:${
                              movement.typeTracking.roundSec < 10 ? "0" : ""
                            }${movement.typeTracking.roundSec}`}
                      </Text>
                    </View>
                  ) : null
                })}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
