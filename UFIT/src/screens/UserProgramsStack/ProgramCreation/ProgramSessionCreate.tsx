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


type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function ProgramSessionCreate({
  navigation,
}: ProgramsMainScreenProps) {
  const [sessionName, onChangeSessionName] = React.useState("");
  

  return (
    <View style={creatingStyles.viewContainer}>
      <View style={{ paddingLeft: 15 }}>
        <ScrollView>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Session
          </Text>
          <SafeAreaView style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Session Name:
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
              onChangeText={onChangeSessionName}
              value={sessionName}
            />
         
          </SafeAreaView>
        </ScrollView>
      </View>

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
  );
}
