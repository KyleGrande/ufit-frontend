import React, {useState, useEffect} from "react";
import { StackParamList } from "../../UserPrograms";
import { Text, View, ScrollView, TouchableOpacity, TextInput, Button, Linking } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LinearGradient from "../../../components/LinearGradient";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../api";
import { SafeAreaView } from "react-native-safe-area-context";
import FormErrorMsg from "../components/FormErrorMsg";
import { RouteProp } from "@react-navigation/native";
import { useMovementsContext } from "../../MovementsContext";

// Form Screen for single movement

export type ProgramAddMovementProp = RouteProp<
  StackParamList,
  "Add Movement Tracking"
>;

type ProgramAddMovementScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
  route: ProgramAddMovementProp;
}

interface MovementData {
  section: string;
  movementName: string;
  movementDescription: string;
  movementLink: string | undefined; // Effect: resolver is underlined red
  typeTracking: {
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


export default function ProgramAddMovementScreen({navigation,route}: ProgramAddMovementScreenProps) {
  const { program,session } = route.params;
  const { handleMovements } =  useMovementsContext();
  const {
    control,
    handleSubmit,    
    watch,
    formState: { errors },
  } = useForm<MovementData>({
    defaultValues: {
      section: "warmup",
      movementName: "",
      movementDescription: "",
      movementLink: "",
      typeTracking: {
        trackingType: "setsreps",
        reps: "1",
        sets: "1",
        rounds: "1",
        roundMin: "0",
        roundSec: "0",
        restMin: "0",
        restSec: "0",
        genMin: "0",
        genSec: "0",
      },
    },
    resolver: yupResolver(
      yup.object().shape({
        section: yup.string().required("Movement section is required"),
        movementName: yup.string().required("Movement name is required"),
        movementDescription: yup
          .string()
          .required("Movement description is required"),
        movementLink: yup.string().required("Movement Link is required"),
        typeTracking: yup
          .object()
          .shape({
            trackingType: yup.string().required("Tracking Type Required"),
            reps: yup.string(),
            sets: yup.string(),
            rounds: yup.string(),
            roundMin: yup.string(),
            roundSec: yup.string(),
            restMin: yup.string(),
            restSec: yup.string(),
            genMin: yup.string(),
            genSec: yup.string(),
          })
          .required("Tracking data is required"),
      })
    ),
  });

  const createMovement = async(movement:any) => {
    try {    
      let response = await api.post('/movement', movement);
      if (response.data.success){
        return String(response.data.data._id);
      }else{
        console.log("Response was not successful");      
      }
    }catch(err){
      console.log(err)      
      throw err;
    }     
  }

  const onSubmit = async(data:any) => {          
    for(let obj of program.session){
      if (obj._id === session._id){ // find session we are adding the movement to
        console.log('True');
        try{          
          const createdMovement = await createMovement(data); // create movement in database
          if(createdMovement === ''){
            console.log('Error when creating movement!');
            return;
          }          
          obj["movementId"].push(createdMovement);// add Movement id to obj array
          // prepare req object with appropriate data for endpoint
          program.id = program._id;
          let res = await api.put('/program/by-id', program);
          if(res.data.success){
            console.log('Movement Successfully added');
            alert('Movement added success!');
            handleMovements(program);
            navigation.goBack();            
          }
          else {
            console.log(res.data.success);
            return;
          }          
        }catch(err){
          console.log(err)
          alert('Error in adding movement! Try again');
          return;
        }        
      }
    }
  }
  
  // TODO
  // Add more white space for easy scrolling experience
  // add progression to each movement, depending on the tracking type

  return (
    <LinearGradient top="#000" bottom="#EA9CFD" style={{ minHeight: "100%" }}>
    
    <SafeAreaView>
    <TouchableOpacity>
      <Text style = {{color: 'white'}} onPress = {()=> navigation.goBack()}>
        {"Go back"} {program._id}
      </Text>

    </TouchableOpacity>
    {/* <View style={{...creatingStyles.viewContainer,paddingRight: 20}}> */}
      <View style={{ paddingLeft: 15, paddingTop: 45,}}>
        <ScrollView style = {{height: "95%"}}>
            {/* <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Add Movement
            </Text> */}
            {/* <SafeAreaView style={{ height: "100%", flex: 1 }}> */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="section"
                render={({ field, fieldState }) => (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Section
                      <Text style={{ flexDirection: "row", color: "red" }}>
                        *
                      </Text>
                      :
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
                    {fieldState?.error && (
                      <FormErrorMsg fieldState={fieldState} />
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="movementName"
                render={({ field, fieldState }) => (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Name
                      <Text style={{ flexDirection: "row", color: "red" }}>
                        *
                      </Text>
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
                      placeholder="Movement Name"
                      placeholderTextColor="white"
                    />
                    {fieldState?.error && (
                      <FormErrorMsg fieldState={fieldState} />
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="typeTracking.trackingType"
                render={({ field, fieldState }) => (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Type Of Tracking
                      <Text style={{ flexDirection: "row", color: "red" }}>
                        *
                      </Text>
                      :
                    </Text>

                    <Text style={{ color: "#CECACA", fontSize: 16 }}>
                      (This will determine how the movement will be tracked
                      during your workouts)
                    </Text>

                    <Picker
                      style={{ color: "white", marginTop: 0, paddingTop: 0 }}
                      selectedValue={field.value}
                      onValueChange={field.onChange}
                      itemStyle={{ color: "white", fontSize: 40 }}
                    >
                      <Picker.Item label="Sets/Reps" value="setsreps" />
                      <Picker.Item label="Round Timer" value="rounds" />                      
                    </Picker>

                    {fieldState?.error && (
                      <FormErrorMsg fieldState={fieldState} />
                    )}
                  </View>
                )}
              />

              <View>
                {watch("typeTracking.trackingType") == "setsreps" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                      height: 200,
                      justifyContent: "center",
                    }}
                  >
                    <Controller
                      control={control}
                      name="typeTracking.sets"
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState }) => (
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
                            <Text
                              style={{ flexDirection: "row", color: "red" }}
                            >
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
                            <Picker.Item label="11" value="11" />
                            <Picker.Item label="12" value="12" />
                          </Picker>
                          {fieldState?.error && (
                            <FormErrorMsg fieldState={fieldState} />
                          )}
                        </View>
                      )}
                    />

                    <Controller
                      control={control}
                      name="typeTracking.reps"
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState }) => (
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
                            <Text
                              style={{ flexDirection: "row", color: "red" }}
                            >
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
                            <Picker.Item label="11" value="11" />
                            <Picker.Item label="12" value="12" />
                            <Picker.Item label="13" value="13" />
                            <Picker.Item label="14" value="14" />
                            <Picker.Item label="15" value="15" />
                          </Picker>
                          {fieldState?.error && (
                            <FormErrorMsg fieldState={fieldState} />
                          )}
                        </View>
                      )}
                    />
                  </View>
                ) : null}

                {watch("typeTracking.trackingType") == "rounds" ? (
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
                          control={control}
                          rules={{
                            required: true,
                          }}
                          name="typeTracking.rounds"
                          render={({ field, fieldState }) => (
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
                              {fieldState?.error && (
                                <FormErrorMsg fieldState={fieldState} />
                              )}
                            </View>
                          )}
                        />

                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          name="typeTracking.roundMin"
                          render={({ field, fieldState }) => (
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
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="30" />
                              </Picker>
                              {fieldState?.error && (
                                <FormErrorMsg fieldState={fieldState} />
                              )}
                            </View>
                          )}
                        />

                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          name="typeTracking.roundSec"
                          render={({ field, fieldState }) => (
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
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="30" />
                              </Picker>
                              {fieldState?.error && (
                                <FormErrorMsg fieldState={fieldState} />
                              )}
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
                          control={control}
                          rules={{
                            required: true,
                          }}
                          name="typeTracking.restMin"
                          render={({ field, fieldState }) => (
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
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="30" />
                              </Picker>
                              {fieldState?.error && (
                                <FormErrorMsg fieldState={fieldState} />
                              )}
                            </View>
                          )}
                        />

                        <Controller
                          control={control}
                          name="typeTracking.restSec"
                          render={({ field, fieldState }) => (
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
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="30" />
                              </Picker>
                              {fieldState?.error && (
                                <FormErrorMsg fieldState={fieldState} />
                              )}
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}

                {watch("typeTracking.trackingType") == "timer" ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "stretch",
                        height: 200,
                      }}
                    >
                      <Controller
                        control={control}
                        name="typeTracking.genMin"
                        render={({ field, fieldState }) => (
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
                              <Text
                                style={{ flexDirection: "row", color: "red" }}
                              >
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
                            {fieldState?.error && (
                              <FormErrorMsg fieldState={fieldState} />
                            )}
                          </View>
                        )}
                      />

                      <Controller
                        control={control}
                        name="typeTracking.restSec"
                        render={({ field, fieldState }) => (
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
                              <Text
                                style={{ flexDirection: "row", color: "red" }}
                              >
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
                            {fieldState?.error && (
                              <FormErrorMsg fieldState={fieldState} />
                            )}
                          </View>
                        )}
                      />
                    </View>
                  </View>
                ) : null}
              </View>

              <Controller
                control={control}
                name="movementDescription"
                render={({ field, fieldState }) => (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Describe your movement
                      <Text style={{ flexDirection: "row", color: "red" }}>
                        *
                      </Text>
                      :
                    </Text>
                    <Text style={{ color: "#CECACA", fontSize: 16 }}>
                      (If you could describe this movement in as few words as
                      possible...)
                    </Text>
                    <TextInput
                      style={{
                        height: 100,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        color: "white",
                        borderColor: "white",
                        borderRadius: 20,
                        
                      }}
                      onChangeText={field.onChange}
                      value={field.value}
                      multiline={true}
                      numberOfLines={4}
                      placeholder="Movement Description"
                      placeholderTextColor="white"
                    />
                    {fieldState?.error && (
                      <FormErrorMsg fieldState={fieldState} />
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="movementLink"
                rules={{
                  required: true,
                }}
                render={({ field, fieldState }) => (
                  <View style={{ paddingBottom: 100 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Movement Link
                      <Text style={{ flexDirection: "row", color: "red" }}>
                        *
                      </Text>
                      :
                    </Text>
                    <Text
                      style={{ color: "#CECACA", fontSize: 16 }}
                      onPress={() =>
                        Linking.openURL(
                          "https://www.youtube.com/watch?v=xvFZjo5PgG0"
                        )
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
                      placeholder="https://www.youtube.com/watch?v="
                      placeholderTextColor = "white"
                    />
                    {fieldState?.error && (
                      <FormErrorMsg fieldState={fieldState} />
                    )}
                  </View>
                )}
              />
            {/* </SafeAreaView> */}
            <View style={{ flex: 1 }}>
              <Button
                title="Save Movement"
                color="orange"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
  }
