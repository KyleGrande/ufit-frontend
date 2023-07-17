import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { creatingStyles } from "../../style";
import { Picker } from "@react-native-picker/picker";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StackParamList } from "../../UserPrograms";
// TODO:
// Add styling to style sheet file
type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function ProgramCreate({ navigation }: ProgramsMainScreenProps) {
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [selectedProgram, setSelectedProgram] = useState("strength");

  return (
    <View style={creatingStyles.viewContainer}>
      <View style={{ paddingLeft: 15 }}>
        <ScrollView>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Create A Program
          </Text>

          <SafeAreaView style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Name:
              <Text style={{ flexDirection: "row", color: "red" }}>*</Text>
            </Text>
            <Text style={{ color: "#CECACA", fontSize: 16 }}>
              (What is the name of this awesome program?)
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
              onChangeText={onChangeName}
              value={name}
            />
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Description:
              <Text style={{ flexDirection: "row", color: "red" }}>*</Text>
            </Text>
            <Text style={{ color: "#CECACA", fontSize: 16 }}>
              (How would you define your gym program?)
            </Text>
            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                color: "white",
                borderColor: "white", 
                paddingBottom: 100,
                borderRadius:20               
              }}
              onChangeText={onChangeDescription}
              value={description}
              multiline = {true}
              numberOfLines={4}
            />
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "bold",
                marginBottom: 0,
                paddingBottom: 0,
              }}
            >
              Category:
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Text style={{ color: "#CECACA", fontSize: 16 }}>
              (This helps others find your awesome gym program!)
            </Text>
            <Picker
              style={{ color: "white", marginTop: 0, paddingTop: 0 }}
              selectedValue={selectedProgram}
              onValueChange={(itemValue: any) => setSelectedProgram(itemValue)}
              itemStyle={{ color: "white", fontSize: 40 }}
            >
              <Picker.Item label="Strength" value="strength" />
              <Picker.Item label="Yoga" value="yoga" />
            </Picker>
          </SafeAreaView>
          {/* Add session button --> new page pop up --> 
                        1. Persist data of this page in Object, 
                        2. Open new session form page
                    */}
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
              marginBottom: 0,
              paddingBottom: 0,
            }}
          >
            Session(s):
            <Text style={{ flexDirection: "row", color: "red" }}>*</Text>
          </Text>
          <Text style={{ color: "#CECACA", fontSize: 16 }}>
              (You need a minimum of 1 session)
            </Text>
          <View>
            <Button
              title="Add Session"
              color="orange"
              onPress={() => {
                console.log(name, description, selectedProgram);
                navigation.navigate("Create a Session");
              }}
            />

            <Button
              title="Publish Program"
              color="orange"
              onPress={() => {
                console.log(name, description, selectedProgram);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
