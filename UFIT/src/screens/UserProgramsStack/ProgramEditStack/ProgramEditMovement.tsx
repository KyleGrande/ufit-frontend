import React, {useState, useEffect} from "react";
import { creatingStyles } from "../../style";
import { StackParamList } from "../../UserPrograms";
import { Text, View, ScrollView, TouchableOpacity, TextInput,Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LinearGradient from "../../../components/LinearGradient";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {api} from '../../../api';
import { SafeAreaView } from "react-native-safe-area-context";
import FormErrorMsg from "../components/FormErrorMsg";
import { RouteProp } from "@react-navigation/native";
import { useMovementsContext } from "../../MovementsContext";

export type ProgramEditMovementProp = RouteProp<
    StackParamList,
    "Edit Program Movement"
>;

type ProgramEditMovementScreenProps = {
    navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
    route: ProgramEditMovementProp;
}

interface typeTracking {
    trackingType: string | undefined;
    reps: string | undefined;
    sets: string | undefined;
    rounds: string | undefined;
    roundMin: string | undefined;
    roundSec: string | undefined;
    restMin: string | undefined;
    restSec: string | undefined;
}
interface movementData {    
    section: string;
    movementName: string;
    movementDescription: string;
    movementLink: string | undefined; // Effect: resolver is underlined red  
    typeTracking: object;
}

// TODO: have page force re-render when visited to get most up to date edits from server
export default function ProgramEditMovementScreen({navigation,route}: ProgramEditMovementScreenProps){
    const { movement, program } = route.params;
    const { handleMovements } = useMovementsContext();     
    const [movementData, setMovementData] = useState(movement || {});
    
    useEffect(() => {
        setMovementData(movement || null);
    }, [movement]);

    const {
        control: control1, 
        getValues: getValues1,
        formState: {errors: errors1},
        watch: watch1
    } = useForm<typeTracking>({
        defaultValues: {
            trackingType: String(movementData.typeTracking.trackingType),
            reps: String(movementData.typeTracking.reps),
            sets: String(movementData.typeTracking.sets),
            rounds: String(movementData.typeTracking.rounds),
            roundMin: String(movementData.typeTracking.roundMin),
            roundSec: String(movementData.typeTracking.roundSec),
            restMin: String(movementData.typeTracking.restMin),
            restSec: String(movementData.typeTracking.restSec),
        },
        resolver: yupResolver(
            yup.object().shape({
                trackingType: yup.string(),
                reps: yup.string(),
                sets: yup.string(),
                rounds: yup.string(),
                roundMin: yup.string(),
                roundSec: yup.string(),
                restMin: yup.string(),
                restSec: yup.string()
            })
        )
    });
    const {
        control,
        handleSubmit,
        getValues,
        watch,
        formState: {errors},
    } = useForm<movementData>({
        defaultValues: {
            section: movementData.section,
            movementName: movementData.movementName,
            movementDescription: movementData.movementDescription,
            movementLink: movementData.movementLink,            
        },
        resolver: 
            yupResolver(
                yup.object().shape({
                section: yup.string().required("Movement section is required"),
                movementName: yup.string().required("Movement name is required"),
                movementDescription: yup
                    .string()
                    .required("Movement description is required"),
                movementLink: yup.string().required("Movement Link is required"),
                })
            )
    });
    const onSubmit = async (data:any) => {
      const trackingData = getValues1();      
      console.log(data);
      console.log(trackingData)
      data.id = movement._id;
      data.typeTracking = trackingData;      
      console.log(data);
      let res = await api.put('/movement/by-id', data);
      console.log("handleMovements type:", typeof handleMovements); // Check the type of refreshMovements
      handleMovements(program);
      // TODO: add if success clause
      navigation.goBack();
    }

    const onDelete = async () => {
      await api.delete(`/movement/by-id/${movement._id}`);
      handleMovements(program);
      navigation.goBack();
    }

    return (
      <LinearGradient
      top="#000"
      bottom="#EA9CFD"
      style={{ minHeight: "100%" }}
      >           
        <View style = {{...creatingStyles.viewContainer, paddingRight:20, paddingLeft:20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style = {{color: 'white'}}>
              Go Back
              </Text>
          </TouchableOpacity>
        <ScrollView
            style={{ width: "100%", height: "90%" }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
        
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Edit Movement
        </Text>            
            <Text style = {{color: "red"}}>
                {movementData.movementName}
            </Text>
           
            <SafeAreaView>

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
                      Section:
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

                {watch1("trackingType") == "setsreps" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                      height: 200,
                      justifyContent: "center",
                    }}
                  >
                    <Controller
                      control={control1}
                      name="sets"
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
                      control={control1}
                      name="reps"
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

                {watch1("trackingType") == "rounds" ? (
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
                          control={control1}
                          rules={{
                            required: true,
                          }}
                          name="rounds"
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
                          control={control1}
                          rules={{
                            required: true,
                          }}
                          name="roundMin"
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
                          control={control1}
                          rules={{
                            required: true,
                          }}
                          name="roundSec"
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
                          control={control1}
                          rules={{
                            required: true,
                          }}
                          name="restMin"
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
                          control={control1}
                          name="restSec"
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

            </SafeAreaView>
            
            <View style = {{justifyContent:'center', alignContent: 'center', alignItems:'center'}}>                
            <Button
              title="Update Movement"
              color="yellow"
              onPress={handleSubmit(onSubmit)}
            />
            <Button
              title="Delete Movement"
              color="red"
              onPress={onDelete}
            />
            </View>
            </ScrollView>
        </View>
    
    </LinearGradient>
    )
}