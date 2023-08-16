import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuth from "../../../hook/useAuth";
import { StackParamList } from "../../UserPrograms";
import LinearGradient from "../../../components/LinearGradient";
import { getGradientColors } from "../../../components/getGradient";

import API, { Session, Movement, WorkoutHistory } from "../../../api";
import { trackingStyles, discoverProgramStyles } from "../../style";
import { useMovementsContext } from "../../MovementsContext";
import { MaterialIcons } from '@expo/vector-icons';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { AntDesign } from '@expo/vector-icons';
import { useUserPrograms } from "../../../provider/UserProgramsContext";

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
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  const { program } = route.params;
  const { deleteProgram } = useUserPrograms();
  const { movements, handleMovements } = useMovementsContext();
  const userId = useAuth()._id as string;
  useEffect(() => {
    handleMovements(program);
  }, [program]);
  useEffect(() => {
    getHistory();
    async function getHistory() {
      const history = await API.getHistoryByProgramId(program._id);
      if (history.data.data) {
        setHistory(history.data.data.reverse());
      }

    }
  }, []);

  const deleteDialog = () =>
    Alert.alert("Delete Program?", "Are you sure you want to delete? \n This action cannot be undone.", [
      { text: "Cancel" },
      { text: "Yes", onPress: handleDelete },
    ]);

  const handleDelete = () => {
    deleteProgram(program._id);
    API.deleteProgram(program._id).then((response) => {
      console.log(response.data.data);
      navigation.navigate("User Programs");
    });
  };



  return (
    <LinearGradient
      top={getGradientColors(program.programCategory.toLowerCase())[0]}
      bottom={getGradientColors(program.programCategory.toLowerCase())[1]}
      style={{ minHeight: "100%" }}
    >
      <SafeAreaView>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={trackingStyles.titleBarText}>{program.programName}</Text>
        <TouchableOpacity style={{ alignSelf:'flex-end', marginRight:20}} onPress={deleteDialog}>
        <AntDesign name="delete" size={30} color="white" style={{alignSelf:'flex-end'}} />
        </TouchableOpacity>
        </View>
        {/* ()=> console.log(program._id, userId) */}
        {program.originalProgramId !== undefined &&
        <TouchableOpacity style = {{marginLeft: 20,marginTop:10, width:'40%',}} onPress = {()=> 
        navigation.navigate('Write Feedback', 
        {
          programId: String(program.originalProgramId), 
          userId: userId
        })}>
          <View style={[trackingStyles.submitButton,{flexDirection:'row', alignSelf:'flex-start', width:'100%'}]}>
            <Text style={[discoverProgramStyles.sessionTitle, {fontSize:16, fontWeight:'normal'}]}>Leave a Review </Text>
          <MaterialIcons name="feedback" size={16} color="white" />
          </View>
        </TouchableOpacity>
        }
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
                      program: program,
                      session: session,
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
          <Text style={discoverProgramStyles.sessionTitle}>History</Text>
          <ScrollView>
            {history.length === 0 && <Text style={{color:'white', fontSize:16,}}>Complete a Session to View History</Text>
            }
            {history.map((session: any, index) => (
              <View key={index}>
              <TouchableOpacity style={[discoverProgramStyles.singleSessionContainer, {minHeight:40, marginBottom:5}]}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={discoverProgramStyles.movementText}>  
                  {session.sessionName}
                </Text>
                <Text style={discoverProgramStyles.movementText}>  
                  {session.date.slice(0,10)}
                </Text>
                </View>
              </TouchableOpacity>
              </View>

            ))}
          </ScrollView>
        </ScrollView>
      {/* </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}
