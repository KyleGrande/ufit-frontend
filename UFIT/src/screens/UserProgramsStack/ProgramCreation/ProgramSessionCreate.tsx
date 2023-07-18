import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { creatingStyles } from "../../style";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StackParamList } from "../../UserPrograms";
import { Picker } from "@react-native-picker/picker";
let FORM = require("../../globalForm.tsx");
type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function ProgramSessionCreate({
  navigation,
}: ProgramsMainScreenProps) {
  const [sessionName, onChangeSessionName] = React.useState("");
  const [restdays, onChangeRestDay] = React.useState("0");

  return (
    <View style={creatingStyles.viewContainer}>
      <View style={{ paddingLeft: 15 }}>
        <ScrollView style={{ height: "90%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Session
          </Text>
          <SafeAreaView style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Session Name:
              <Text style={{ flexDirection: "row", color: "red" }}>*</Text>              
            </Text>
            <Text style={{ color: "#CECACA", fontSize: 16 }}>
              (What is this workout session going to be called?)
            </Text>
            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                color: "white",
                borderColor: "white",
                borderRadius: 20
              }}
              onChangeText={onChangeSessionName}
              value={sessionName}
            />

            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "bold",
                marginTop: 40,
              }}
            >
              Rest Days:
              <Text style={{ flexDirection: "row", color: "red" }}>*</Text>
            </Text>
            <Text style={{ color: "#CECACA", fontSize: 16 }}>
              (The number of rest days after this workout session)
            </Text>
            <Picker
              style={{ color: "white", marginTop: 0, paddingTop: 0 }}
              selectedValue={restdays}
              onValueChange={(itemValue: any) => onChangeRestDay(itemValue)}
              itemStyle={{ color: "white", fontSize: 40 }}
            >
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </SafeAreaView>
          <View>
            <Button
              title="Add Movement"
              color="orange"
              onPress={() => {
                console.log("Adding Movement to program");
                navigation.navigate("Create a Movement");
              }}
            />

            <Button
              title="Save Session"
              color="orange"
              onPress={() => {
                console.log("Creating session");
                navigation.navigate("Create a Program");
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
