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
import { Linking } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";

type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

// Movement Form Schema

interface MovementData {
  section: string;
  movementName: string;
  movementDescription: string;
  movementLink: string | undefined; // Effect: resolver is underlined red   
  trackingData: {
    trackingType: string;
    reps: string | undefined;
    sets: string | undefined;
    rounds: string | undefined;
    roundMin: string | undefined;
    roundSec: string | undefined;
    restMin: string | undefined;
    restSec: string | undefined;
    genMin: string | undefined;
    genSec: string | undefined;
  };
}

export default function ProgramMovementCreate({
  navigation
}: ProgramsMainScreenProps) {
  
  const route = useRoute();
  // add Movement to session data
  const {addMovement} = route.params;

  const onSubmit = (data:any) => {
    addMovement(data);
    navigation.navigate("Create a Session");
  }

  // Movement Form validation and react-hook-form state with 'useForm'
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<MovementData>({
    defaultValues: {
      section: "post", // TODO: set to warmup, post is used as test
      movementName: "Hello World!",
      movementDescription: "Cool",
      movementLink: "youtube./com",  
      trackingData: {
        trackingType: "setsreps",
        reps: "0",
        sets: "0",
        rounds: "0",
        roundMin: "0",
        roundSec: "0",
        restMin: "0",
        restSec: "0",
        genMin: "0",
        genSec: "0",
      }    
    },
    resolver: yupResolver(
      yup.object().shape({
        section: yup.string().required("Movement section is required"),
        movementName: yup.string().required("Movement name is required"),
        movementDescription: yup.string().required("Movement description is required"),
        movementLink: yup.string().notRequired(),        
        trackingData: yup.object().shape({
          trackingType: yup.string().required('Tracking Type Required'),
          reps: yup.string(),
          sets: yup.string(),
          rounds: yup.string(),
          roundMin: yup.string(),
          roundSec: yup.string(),
          restMin: yup.string(),
          restSec: yup.string(),
          genMin: yup.string(),
          genSec: yup.string(),
        }).required('Tracking data is required')
      })
    ),
  })

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

            <Controller
              control={control}
              rules={{
                required: true
              }}
              name="section"
              render={({field, fieldState})=> (
                <View>
                  <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                    Section
                  <Text style={{ flexDirection: "row", color: "red" }}>*</Text>:
                  </Text>
                  <Text style={{ color: "#CECACA", fontSize: 16 }}>
                    (Choose the best place for your movement)
                  </Text>
                  <Picker
                    style={{ color: "white", marginTop: 0, paddingTop: 0 }}
                    selectedValue={field.value}
                    onValueChange={field.onChange}
                    itemStyle={{ color: "white", fontSize: 40 }}
                  >
                    <Picker.Item label="Warm up" value="warmup" />
                    <Picker.Item label="Main Movement" value="main" />
                    <Picker.Item label="Post Movement" value="post" />
                  </Picker>
                </View>
              )}
            />
           
          <Controller
            control={control}
            rules= {{
              required: true
            }}
            name="movementName"
            render={({ field, fieldState}) => (
              <View>
              <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                Name
                <Text style={{ flexDirection: "row", color: "red" }}>*</Text>          
              </Text>
              
              <Text style={{ color: "#CECACA", fontSize: 16 }}>
                (Name of your movement)
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
              control = {control}
              rules = {{
                required: true
              }}
              name="trackingData.trackingType"
              render={({ field, fieldState }) => (
                <View>
                    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                      Type Of Tracking
                    <Text style={{ flexDirection: "row", color: "red" }}>*</Text>:
                  </Text>

                  <Text style={{ color: "#CECACA", fontSize: 16 }}>
                    (This will determine how the movement will be tracked during your
                    workouts)
                  </Text>
                  
                  <Picker
                    style={{ color: "white", marginTop: 0, paddingTop: 0 }}
                    selectedValue={field.value}
                    onValueChange={field.onChange}
                    itemStyle={{ color: "white", fontSize: 40 }}
                  >
                    <Picker.Item label="Sets/Reps" value="setsreps" />
                    <Picker.Item label="Round Timer" value="rounds" />
                    <Picker.Item label="Timer" value="timer" />
                  </Picker>

       
                </View>
              )}
            />
            
            <View>
              {
              watch("trackingData.trackingType") == "setsreps" ? (
                <View style={{
                  flexDirection: "row",
                  alignItems: "stretch",
                  height: 200,
                  justifyContent: "center"
                }}>
                
                <Controller
                  control = {control}
                  name="trackingData.sets"
                  rules={{
                    required: true
                  }}
                  render={({field, fieldState}) => (                                
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
                        selectedValue={field.value}
                        onValueChange={field.onChange}
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
                  )}
                  />  
                  
                    
                <Controller 
                  control = {control}
                  name = "trackingData.reps"
                  rules = {{
                    required: true
                  }}
                  render={({field, fieldState}) => (
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
                      selectedValue={field.value}
                      onValueChange={field.onChange}
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
                  )}
                />

                </View>           
              ):null}

              {
              watch("trackingData.trackingType") == "rounds"
               ? (
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
                    <Controller
                      control = {control}
                      rules = {{
                        required: true
                      }}
                      name= "trackingData.rounds"
                      render={({field, fieldState}) => (
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
                            selectedValue={field.value}
                            onValueChange={field.onChange}
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
                      )}
                      />
                      
                      <Controller 
                        control = {control}
                        rules = {{
                          required: true
                        }}
                        name = "trackingData.roundMin"
                        render = {({field, fieldState}) => (
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
                              selectedValue={field.value}
                              onValueChange={field.onChange}
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
                        )}
                      />
                      
                    <Controller 
                      control = {control}
                      rules = {{
                        required: true
                      }}
                      name="trackingData.roundSec"
                      render={({field, fieldState}) => (
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
                          selectedValue={field.value}
                          onValueChange={field.onChange}
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
                      )}
                    />                      
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

                      <Controller 
                        control = {control}                        
                        rules = {{
                          required: true
                        }}
                        name= "trackingData.restMin"
                        render={({field, fieldState}) => (
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
                              selectedValue={field.value}
                              onValueChange={field.onChange}
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
                        )}
                      />
                      
                      <Controller
                      control = {control}
                      name = "trackingData.restSec"
                      render = {({field, fieldState}) => (
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
                            selectedValue={field.value}
                            onValueChange={field.onChange}
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
                      )}
                      />
                     
                    </View>
                  </View>
                </View>
              ): null}

              {watch("trackingData.trackingType") == "timer" ? (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                      height: 200,
                    }}
                  >
                    <Controller 
                      control = {control}
                      name = "trackingData.genMin"
                      render={({field, fieldState}) => (
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
                            selectedValue={field.value}
                            onValueChange={field.onChange}
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
                      )}                      
                    />
                    
                    <Controller
                      control={control}
                      name="trackingData.restSec"
                      render={({field,fieldState})=>(
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
                            selectedValue={field.value}
                            onValueChange={field.onChange}
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
                      )}
                    />
                  </View>
                </View>
              ):null}
            </View>
          
          <Controller 
            control={control}
            name="movementDescription"
            render={({field,fieldState}) => (
              <View>
                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                  Describe your movement
                </Text>
                <Text style={{ color: "#CECACA", fontSize: 16 }}>
                  (If you could describe this movement in as few words as
                  possible...)
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
                    paddingBottom: 100              
                  }}
                  onChangeText={field.onChange}
                  value={field.value}
                  multiline = {true}
                  numberOfLines={4}
                />
              </View>
            )}
          />
          
          <Controller 
            control= {control}
            name="movementLink"
            rules={{
              required: true
            }}
            render={({field,fieldState})=> (
              <View style={{ paddingBottom: 100 }}>
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Movement Link
                </Text>
                <Text
                  style={{ color: "#CECACA", fontSize: 16 }}
                  onPress={() =>
                    Linking.openURL("https://www.youtube.com/watch?v=xvFZjo5PgG0")
                  }
                >
                  (https://www.youtube.com/watch?v=xvFZjo5PgG0)
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
            
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            <Button
              title="Save Movement"
              color="orange"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
