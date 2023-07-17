import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, TextInput } from "react-native";
import { creatingStyles } from "../../style";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StackParamList } from "../../UserPrograms";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function ProgramMovementCreate({
  navigation,
}: ProgramsMainScreenProps) {
  const [selectedSection, setSelectedSection] = useState([
    "warmup",
    "main",
    "post",
  ]);

  {
    /*Form--Picker Data*/
  }
  const [selectedTracking, setSelectedTracking] = useState("setsreps");

  {
    /*Form--Text Data*/
  }
  const [movementName, onChangeMovementName] = useState("");
  const [movementDesc, onChangeMovementDesc] = useState("");
  const [movementLink, onChangeMovementLink] = useState("");

  {
    /*Sets/Reps Data*/
  }
  const [selectedSet, setSelectedSet] = useState("0");
  const [selectedRep, setSelectedRep] = useState("0");

  {
    /*Round Timer Data*/
  }
  const [selectedRound, setSelectedRound] = useState("0");
  const [selectedMinute, setSelectedMinute] = useState("0");
  const [selectedSecond, setSelectedSecond] = useState("0");

  {
    /*Rest Time Data*/
  }
  const [selectedRestMinute, setSelectedRestMinute] = useState("0");
  const [selectedRestSecond, setSelectedRestSecond] = useState("0");

  {
    /*General Time Data*/
  }
  const [selectedGMinute, setSelectedGMinute] = useState("0");
  const [selectedGSecond, setSelectedGSecond] = useState("0");

  // TODO
  // Add more white space for easy scrolling experience
  // add progression to each movement, depending on the tracking type

  return (
    <View style={creatingStyles.viewContainer}>
      <View style={{ paddingLeft: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Add Movement
        </Text>

        <ScrollView
          style={{ width: "100%", height: "90%" }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <SafeAreaView style={{ height: "100%", flex: 1 }}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Section
              <Text style={{ flexDirection: "row", color: "red" }}>*</Text>:
            </Text>

            <Picker
              style={{ color: "white", marginTop: 0, paddingTop: 0 }}
              selectedValue={selectedSection}
              onValueChange={(itemValue: any) => setSelectedSection(itemValue)}
              itemStyle={{ color: "white", fontSize: 40 }}
            >
              <Picker.Item label="Warm up" value="warmup" />
              <Picker.Item label="Main Movement" value="main" />
              <Picker.Item label="Post Movement" value="post" />
            </Picker>

            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Name
              <Text style={{ flexDirection: "row", color: "red" }}>*</Text>
            </Text>

            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                color: "white",
                borderColor: "white",
              }}
              onChangeText={onChangeMovementName}
              value={movementName}
            />

            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Type Of Tracking
              <Text style={{ flexDirection: "row", color: "red" }}>*</Text>:
            </Text>
            <View>
              <Picker
                style={{ color: "white", marginTop: 0, paddingTop: 0 }}
                selectedValue={selectedTracking}
                onValueChange={(itemValue: any) =>
                  setSelectedTracking(itemValue)
                }
                itemStyle={{ color: "white", fontSize: 40 }}
              >
                <Picker.Item label="Sets/Reps" value="setsreps" />
                <Picker.Item label="Round Timer" value="rounds" />
                <Picker.Item label="Timer" value="timer" />
              </Picker>

              {selectedTracking.includes("setsreps") && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                      height: 200,
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Sets
                        <Text style={{ flexDirection: "row", color: "red" }}>
                          *
                        </Text>
                        :
                      </Text>
                      <Picker
                        style={{ color: "white", marginTop: 0, paddingTop: 0 }}
                        selectedValue={selectedSet}
                        onValueChange={(itemValue: any) =>
                          setSelectedSet(itemValue)
                        }
                        itemStyle={{ color: "white", fontSize: 30 }}
                      >
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                      </Picker>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Reps
                        <Text style={{ flexDirection: "row", color: "red" }}>
                          *
                        </Text>
                        :
                      </Text>
                      <Picker
                        style={{
                          color: "white",
                          marginTop: 0,
                          paddingTop: 0,
                        }}
                        selectedValue={selectedRep}
                        onValueChange={(itemValue: any) =>
                          setSelectedRep(itemValue)
                        }
                        itemStyle={{ color: "white", fontSize: 30 }}
                      >
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                      </Picker>
                    </View>
                  </View>
                </View>
              )}

              {selectedTracking.includes("rounds") && (
                <View>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Round Time
                      <Text style={{ flexDirection: "row", color: "red" }}>
                        *
                      </Text>
                      :
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "stretch",
                        height: 200,
                      }}
                    >
                      <View style={{ width: "33%" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Rounds:
                        </Text>
                        <Picker
                          style={{
                            color: "white",
                            marginTop: 0,
                            paddingTop: 0,
                          }}
                          selectedValue={selectedRound}
                          onValueChange={(itemValue: any) =>
                            setSelectedRound(itemValue)
                          }
                          itemStyle={{ color: "white", fontSize: 30 }}
                        >
                          <Picker.Item label="0" value="0" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                          <Picker.Item label="6" value="6" />
                          <Picker.Item label="7" value="7" />
                          <Picker.Item label="8" value="8" />
                          <Picker.Item label="9" value="9" />
                          <Picker.Item label="10" value="10" />
                        </Picker>
                      </View>

                      <View style={{ width: "33%" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Minutes:
                        </Text>

                        <Picker
                          style={{
                            color: "white",
                            marginTop: 0,
                            paddingTop: 0,
                          }}
                          selectedValue={selectedMinute}
                          onValueChange={(itemValue: any) =>
                            setSelectedMinute(itemValue)
                          }
                          itemStyle={{ color: "white", fontSize: 30 }}
                        >
                          <Picker.Item label="0" value="0" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                          <Picker.Item label="6" value="6" />
                          <Picker.Item label="7" value="7" />
                          <Picker.Item label="8" value="8" />
                          <Picker.Item label="9" value="9" />
                          <Picker.Item label="10" value="10" />
                        </Picker>
                      </View>

                      <View style={{ width: "33%" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Seconds:
                        </Text>
                        <Picker
                          style={{
                            color: "white",
                            marginTop: 0,
                            paddingTop: 0,
                          }}
                          selectedValue={selectedSecond}
                          onValueChange={(itemValue: any) =>
                            setSelectedSecond(itemValue)
                          }
                          itemStyle={{ color: "white", fontSize: 30 }}
                        >
                          <Picker.Item label="0" value="0" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                          <Picker.Item label="6" value="6" />
                          <Picker.Item label="7" value="7" />
                          <Picker.Item label="8" value="8" />
                          <Picker.Item label="9" value="9" />
                          <Picker.Item label="10" value="10" />
                        </Picker>
                      </View>
                    </View>
                  </View>

                  {/* Rest Time form */}
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Rest Time
                      <Text style={{ flexDirection: "row", color: "red" }}>
                        *
                      </Text>
                      :
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "stretch",
                        height: 200,
                      }}
                    >
                      <View style={{ width: "33%" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Minutes:
                        </Text>

                        <Picker
                          style={{
                            color: "white",
                            marginTop: 0,
                            paddingTop: 0,
                          }}
                          selectedValue={selectedRestMinute}
                          onValueChange={(itemValue: any) =>
                            setSelectedRestMinute(itemValue)
                          }
                          itemStyle={{ color: "white", fontSize: 30 }}
                        >
                          <Picker.Item label="0" value="0" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                          <Picker.Item label="6" value="6" />
                          <Picker.Item label="7" value="7" />
                          <Picker.Item label="8" value="8" />
                          <Picker.Item label="9" value="9" />
                          <Picker.Item label="10" value="10" />
                        </Picker>
                      </View>

                      <View style={{ width: "33%" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Seconds:
                        </Text>
                        <Picker
                          style={{
                            color: "white",
                            marginTop: 0,
                            paddingTop: 0,
                          }}
                          selectedValue={selectedRestSecond}
                          onValueChange={(itemValue: any) =>
                            setSelectedRestSecond(itemValue)
                          }
                          itemStyle={{ color: "white", fontSize: 30 }}
                        >
                          <Picker.Item label="0" value="0" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                          <Picker.Item label="6" value="6" />
                          <Picker.Item label="7" value="7" />
                          <Picker.Item label="8" value="8" />
                          <Picker.Item label="9" value="9" />
                          <Picker.Item label="10" value="10" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {selectedTracking.includes("timer") && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                      height: 200,
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Minutes
                        <Text style={{ flexDirection: "row", color: "red" }}>
                          *
                        </Text>
                        :
                      </Text>
                      <Picker
                        style={{ color: "white", marginTop: 0, paddingTop: 0 }}
                        selectedValue={selectedGMinute}
                        onValueChange={(itemValue: any) =>
                          setSelectedGMinute(itemValue)
                        }
                        itemStyle={{ color: "white", fontSize: 30 }}
                      >
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                      </Picker>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Seconds
                        <Text style={{ flexDirection: "row", color: "red" }}>
                          *
                        </Text>
                        :
                      </Text>
                      <Picker
                        style={{
                          color: "white",
                          marginTop: 0,
                          paddingTop: 0,
                        }}
                        selectedValue={selectedGSecond}
                        onValueChange={(itemValue: any) =>
                          setSelectedGSecond(itemValue)
                        }
                        itemStyle={{ color: "white", fontSize: 30 }}
                      >
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                      </Picker>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Describe your movement
            </Text>

            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                color: "white",
                borderColor: "white",
              }}
              onChangeText={onChangeMovementDesc}
              value={movementDesc}
            />

            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Movement Link
            </Text>

            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                color: "white",
                borderColor: "white",
              }}
              onChangeText={onChangeMovementLink}
              value={movementLink}
            />
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            <Button
              title="Save Movement"
              color="orange"
              onPress={() => {
                console.log("Adding Movement to program");
                navigation.navigate("Create a Session");
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
