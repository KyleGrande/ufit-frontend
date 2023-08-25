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
import { LogBox, Switch } from 'react-native';
import axios from "axios"
import LinearGradient from "../../../components/LinearGradient";
import {api} from "../../../api";
import { useUserPrograms } from "../../../provider/UserProgramsContext";
import useAuth from '../../../hook/useAuth';
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
  // state for public toggler 
  const [publicToggle, setPublicToggle ] = useState(true);
  const { control, handleSubmit, getValues, setValue, watch } = useFormContext();
  const userId = useAuth()._id as string;
  const { handleDiscoverPrograms } = useUserPrograms()
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

  const createMovements = async(movements:any) => {
    let movementsBuffer = []
    for(const m of movements){
      try{
        console.log('MOVEMENT DATA POST TO SERVER');
        console.log(m);
        let response = await api.post('/movement', m);
        console.log("getting response............");
        if (response.data.success) {
            console.log('response.success exists');            
            movementsBuffer.push(response.data.data._id);
        } else {
            console.log('no response.success');
            return [];
        }
      }
      catch(err){
        console.log('Error: ', err);
        return [];
      }
    }

    return movementsBuffer;
  }

  const handleSessions = async(data:any) => {
    let sessions = data.sessions;
    console.log("inside handle Sessions");
    console.log(sessions);
    for(let session of sessions){
      try {
        let handledMovements = await createMovements(session.movements); // array of ObjectId(s)
        console.log('after calling createMovements');
        console.log(handledMovements);
        console.log('Getting back movement buffer...')
        session["movementId"] = handledMovements; // database schema names movements `movementId`          
      }
      catch(err) {
        console.log('Error: ', "Failed to handle sessions" );
        console.log(err);
      }
    }    
  }

  const { addProgram } = useUserPrograms();
  const onSubmit = async(data:any) => {         
    console.log('Form Data:', data);   
    try {
      let movementSubmission = await handleSessions(data);
      console.log("Checking movement submission");
      console.log(data.sessions[0].movements);
      // console.log(data);
      let parsedData = {
        programName: data.programName,
        userId: userId,
        programDescription: data.programDescription,
        programCategory: data.programCategory,
        session: data.sessions,        
      }      
      let formSubmission = await api.post('/program', parsedData );      
      if (formSubmission.data.success){
        console.log(formSubmission.data.data);
        let createdProgram = formSubmission.data.data;
        addProgram(createdProgram);
        handleDiscoverPrograms();
        navigation.navigate('User Programs');
      }else{
        console.log('Error: ', 'Form submission was a failure'); // maybe a notification system to notify the user
      }
    }    
    catch(err){
      console.log("Error: ", "There was an error while handling sessions on submit");
      console.log(err);
    }
  };
  const toggleSwitch = () => setPublicToggle(previous => !previous);

  return (
     <LinearGradient
      top="#000"
      bottom="#EA9CFD"
      style={{ minHeight: "100%" }}
    >   
    <SafeAreaView>
    {/* <View style={{...creatingStyles.viewContainer,paddingRight: 20}}> */}
      <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop:15 }}>
        <ScrollView>
          {/* <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Create A Program
          </Text> */}
        
          {/* <SafeAreaView style={{ marginTop: 40 }}> */}
          
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
          /
            >
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingBottom:10, paddingTop:10}}>
            <Text style = {{fontSize:20, color: 'white', fontWeight: 'bold'}}>
                Public: 
            </Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={publicToggle? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={publicToggle}
              />
          </View>

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
                  <Picker.Item label="Cardio" value="cardio" />
                  <Picker.Item label="Custom" value="custom" />
                </Picker>
                
                {fieldState?.error && (
                <FormErrorMsg fieldState = {fieldState} />                
                )} 
                
                </View>
              )}
            />
           
          {/* </SafeAreaView> */}
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
                <SessionComponent key={index} session = {ufit} deleteSession = {deleteSession} idx = {index} />
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
    {/* </View> */}
    </SafeAreaView>
  </LinearGradient>
 );
}
