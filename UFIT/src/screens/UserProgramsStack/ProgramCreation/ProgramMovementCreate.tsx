import React, { useState } from "react";
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
  const [movementName, onChangeMovementName] = useState("");
  const [selectedTracking, setSelectedTracking] = useState([
    "setsreps",
    "rounds",
    "timer",
  ]);
  const [movementDesc, onChangeMovementDesc] = useState("");
  const [movementLink, onChangeMovementLink] = useState("");
  return (
    <View style={creatingStyles.viewContainer}>
      <View style={{ paddingLeft: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Add Movement
        </Text>

        <ScrollView style = {{width: '100%', height: '90%'}} contentContainerStyle={{flexGrow: 1}}>
          <SafeAreaView style={{ height: '100%', flex:1 }}>
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

            <Picker
              style={{ color: "white", marginTop: 0, paddingTop: 0 }}
              selectedValue={selectedTracking}
              onValueChange={(itemValue: any) => setSelectedTracking(itemValue)}
              itemStyle={{ color: "white", fontSize: 40 }}
            >
              <Picker.Item label="Sets/Reps" value="setsreps" />
              <Picker.Item label="Round Timer" value="rounds" />
              <Picker.Item label="Timer" value="timer" />
            </Picker>

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
          <View style = {{flex:1}}>
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
