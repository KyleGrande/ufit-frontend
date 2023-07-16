import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { creatingStyles, programStyles } from "../../style";
import { Picker } from "@react-native-picker/picker";
import LinearGradient from "../../../component/LinearGradient";

export default function ProgramCreate() {
  const [text, onChangeText] = React.useState("Placeholder Text");
  const [number, onChangeNumber] = React.useState("Placeholder Text");
  const [selectedLanguage, setSelectedLanguage] = useState(["java", "js"]);

  return (
    <View style={{ minHeight: "100%" }}>
      <LinearGradient top="#000" bottom="#EA9CFD" style={{ minHeight: "100%" }}>
        <View style={creatingStyles.viewContainer}>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Create A Program
          </Text>

          <SafeAreaView style={{ marginTop: 40, minHeight: "100%" }}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Name:
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
              onChangeText={onChangeText}
              value={text}
            />
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Description:
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
              onChangeText={onChangeNumber}
              value={number}
            />
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Category:
            </Text>
            <Picker
              style={{ color: "white" }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue: any) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item
                style={{ color: "white" }}
                label="Java"
                value="java"
              />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>

            <View
              style={{
                ...programStyles.touchableOpacityStyle,
                position: "relative",
                marginTop: 40,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <TouchableOpacity
              // onPress={() => navigation.navigate("Create a Program")}
              >
                {/* <Button
                title="Create Program"
                color="#504444"
                onPress={() => navigation.navigate("Create a Program")}
              /> */}
                <Text
                  style={{
                    color: "#ebe2e2",
                    backgroundColor: "#000",
                    fontWeight: "bold",
                    padding: 12,
                    borderRadius: 10,
                    opacity: 0.7,
                    overflow: "hidden",
                  }}
                >
                  Add Session
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...programStyles.touchableOpacityStyle,
                position: "absolute",
              }}
            >
              <TouchableOpacity
              // onPress={() => navigation.navigate("Create a Program")}
              >
                {/* <Button
                title="Create Program"
                color="#504444"
                onPress={() => navigation.navigate("Create a Program")}
              /> */}
                <Text
                  style={{
                    color: "#ebe2e2",
                    backgroundColor: "#000",
                    fontWeight: "bold",
                    padding: 12,
                    borderRadius: 10,
                    opacity: 0.7,
                  }}
                >
                  Publish Program
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </LinearGradient>
    </View>
  );
}
