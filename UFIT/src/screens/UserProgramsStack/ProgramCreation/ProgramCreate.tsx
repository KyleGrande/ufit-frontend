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
import { useForm, Controller, Form, useFieldArray } from 'react-hook-form';
import { useFormContext } from "../../StateContext";
import SessionComponent from "../components/SessionComponent";
import FormErrorMsg from "../components/FormErrorMsg";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
// TODO:
// Add styling to style sheet file
// Add more white space for easy scrolling experience
type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function ProgramCreate({ navigation }: ProgramsMainScreenProps) {
  const { control, handleSubmit, getValues, setValue, watch } = useFormContext();
  const sessionsFieldArray = useFieldArray({
    control: control,
    name: 'sessions'
  });
  const { fields } = sessionsFieldArray;
  const addSession = (session:object) => {
    console.log("Adding session");
    const sessions = getValues('sessions') || [];
    setValue('sessions', [...sessions, session ]);
  }

  const deleteSession = (index:number) => {
    const sessions = getValues('sessions') || [];
    setValue('sessions', sessions.filter((_,i)=> i !== index));
  }

  const onSubmit = (data:any) => {     
    console.log('Send data to database');
    console.log('Form Data:', data);    
  };

  return (
    <View style={{...creatingStyles.viewContainer,paddingRight: 20}}>
      <View style={{ paddingLeft: 15 }}>
        <ScrollView>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Create A Program
          </Text>
        
          <SafeAreaView style={{ marginTop: 40 }}>
          
          <Controller 
            control={control}
            rules={{
              required: true
            }}
            name="programName"
            render={({ field, fieldState }) => (
            <View>
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
                  borderRadius: 20,                  
                }}
                onChangeText={field.onChange}
                value={field.value}
                placeholder="Program Name"
                placeholderTextColor = "white"
              />
              {fieldState?.error && (
                <FormErrorMsg fieldState = {fieldState} />                
              )}           
            </View>
            )}
          />
         
            <Controller
              control = {control}
              rules={{
                required: true
              }}
              name="programDescription"
              render={({field, fieldState})=>(
                <View>
                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                  Description:                
                  <Text style={{ flexDirection: "row", color: "red" }}>
                    *
                  </Text>                
                </Text>

                <Text style={{ color: "#CECACA", fontSize: 16 }}>
                  (How would you define your gym program?)
                </Text>
                
                <TextInput
                  style={{
                    height: 100,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    color: "white",
                    borderColor: "white",                     
                    borderRadius:20               
                  }}
                  onChangeText={field.onChange}
                  value={field.value}
                  multiline = {true}
                  numberOfLines={4}
                  placeholder="Description"
                  placeholderTextColor="white"
                />

                {fieldState?.error && (
                  <FormErrorMsg fieldState = {fieldState} />                
                )} 

              </View>
              )}
              />
            
            <Controller
              control = {control}             
              name="programCategory"
              rules={{
                required: true
              }}
              render={({ field, fieldState }) => (
                <View>
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
                    <Text style={{ color: "red" }}>
                      *
                    </Text>
                  </Text>
                <Text style={{ color: "#CECACA", fontSize: 16 }}>
                  (This helps others find your awesome gym program!)
                </Text>

                <Picker
                  style={{ color: "white", marginTop: 0, paddingTop: 0 }}
                  selectedValue={field.value}
                  onValueChange={(itemValue) => field.onChange(itemValue)}
                  itemStyle={{ color: "white", fontSize: 40 }}
                >
                  <Picker.Item label="SELECT" value="undefined" />
                  <Picker.Item label="Strength" value="strength" />
                  <Picker.Item label="Yoga" value="yoga" />
                </Picker>
                
                {fieldState?.error && (
                <FormErrorMsg fieldState = {fieldState} />                
                )} 
                
                </View>
              )}
            />
           
          </SafeAreaView>
          {/* 
          Add session button --> new page pop up --> 
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
            <Text style={{ flexDirection: "row", color: "red" }}>
              *
            </Text>
          </Text>

          <Text style={{ color: "#CECACA", fontSize: 16 }}>
              (You need a minimum of 1 session to publish)
          </Text>
          
            {
              fields.map((ufit,index) => (
                <SessionComponent session = {ufit} deleteSession = {deleteSession} idx = {index} />
              ))
            }

          <View style={{justifyContent: 'center'}}>
            <Button
              title="Add Session"
              color="orange"
              onPress={() => {
                // const sessions = getValues('sessions') || []; // get sessions or default to empty array
                // const movements = sessions.map(session => session.movements);
                // const allMovements = movements.flat();
                // console.log('Form Data:', getValues());
                // console.log('All Movements:', allMovements);
                navigation.navigate("Create a Session", {addSession: addSession, deleteSession: deleteSession});
              }}              
            />

            <Button
              title="Publish Program"
              color="orange"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>

      </View>
    </View>
  );
}
