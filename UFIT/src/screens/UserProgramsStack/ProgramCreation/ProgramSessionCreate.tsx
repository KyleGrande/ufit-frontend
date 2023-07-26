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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

interface SessionData {
  sessionName: string;
  restDays: string;
  // movements: [];
}

export default function ProgramSessionCreate({navigation,route}: ProgramsMainScreenProps) {
  // Form state management + form validation
  const {addSession} = route.params;
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionData>({
    defaultValues: {
      sessionName: "Hello Ricardo",
      restDays: "3",      
    },
    resolver: yupResolver(
      yup.object().shape({
        sessionName: yup.string().required("Session name is required"),
        restDays: yup.string().required("Rest days are required"),
        // movements: yup
        //   .array()
        //   .of(yup.object())
          // .min(1, "Minimum of 1 movement is required") // test without movements         
      })
    ),
  });

  const onSessionSubmit = (data:any) => {    
    // use passed by function to store in programs sessions array
    addSession(data);
    navigation.navigate("Create a Program");
    console.log('Form Data:', data);
  }

  // const [sessionName, onChangeSessionName] = React.useState("");
  const [restdays, onChangeRestDay] = React.useState("0");

  return (
    <View style={creatingStyles.viewContainer}>
      <View style={{ paddingLeft: 15 }}>
        <ScrollView style={{ height: "90%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Session
          </Text>
          <SafeAreaView style={{ marginTop: 40 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="sessionName"
              render={({ field, fieldState }) => (
                <View>
                  <Text
                    style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                  >
                    Session Name:
                    <Text style={{ flexDirection: "row", color: "red" }}>
                      *
                    </Text>
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
                      borderRadius: 20,
                    }}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </View>
              )}
            />
          <Controller 
            control={control}
            rules={{
              required: true
            }}
            name="restDays"
            render={({ field, fieldState }) => (
              <View>
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
                selectedValue={field.value}
                onValueChange={field.onChange}
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
              </View>
            )}
          />
            
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
              onPress={handleSubmit(onSessionSubmit)}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
