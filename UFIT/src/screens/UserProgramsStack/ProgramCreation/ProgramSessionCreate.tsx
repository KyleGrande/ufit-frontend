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
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp } from "@react-navigation/native";
import MovementComponent from "../components/MovementCard";
import MovementComponentOption from "../components/MovementCardOption";
import FormErrorMsg from "../components/FormErrorMsg";
import LinearGradient from "../../../components/LinearGradient";
export type ProgramSessionCreateRouteProp = RouteProp<StackParamList, 'Create a Session'>;

type ProgramSessionCreateProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
  route: ProgramSessionCreateRouteProp;
};

interface SessionData {
  name: string;
  restDays: string;  
  movements: Object[];
}

export default function ProgramSessionCreate({navigation,route}: ProgramSessionCreateProps) {
  // Form state management + form validation  
  const {addSession, deleteSession} = route.params;
  
  const methods = useForm<SessionData>({
    defaultValues: {      
      restDays: "0",      
      movements: []
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Session name is required"),
        restDays: yup.string().required("Rest days are required"),
        movements: yup
          .array()
          .of(yup.object())
          .min(1, "Minimum of 1 movement is required") // test without movements         
      })
    ),
  });
  
  // register movements array
  const movementsFieldArray = useFieldArray({
    control: methods.control,
    name: 'movements'
  });
  const { fields } = movementsFieldArray;
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  // Passed to movement form
  const addMovement = (movement:object) => {
    const movements = getValues('movements') || [];
    setValue('movements', [...movements, movement]);
  }

  const removeMovement = (index:number) => {
    const movements = getValues('movements') || [];
    setValue('movements', movements.filter((_,i) => i !== index))
  }

  const onSessionSubmit = (data:any) => {    
    // use passed by function to store in programs sessions array
    console.log(data); // logging  
    addSession(data);    
    navigation.navigate("Create a Program");
  }
  
  var movementsLength = watch('movements').length;
  
  return (
   <LinearGradient
      top="#000"
      bottom="#EA9CFD"
      style={{ minHeight: "100%" }}
    >  
    <View style={{...creatingStyles.viewContainer}}>
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
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
              name="name"
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
                    placeholder="Session Name"
                    placeholderTextColor = "white"
                  />
                  
                  {fieldState?.error && (
                    <FormErrorMsg fieldState = {fieldState} />                
                  )} 
                
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
              
              {fieldState?.error && (
                <FormErrorMsg fieldState = {fieldState} />                
              )}                 
              
              </View>
            )}
          />
            
            
              {
                movementsLength > 0 ? <Text style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 40,
                }}>Movements</Text> : null
              }
            
              {
                watch('movements').filter(movement => movement.section === 'warmup').length != 0 ? <Text style={{
                  fontSize: 16,
                  color: "white",
                  fontWeight: "bold"                
                }}>Warm up</Text> : null
              }
            
              {fields.map((field,index) => (
                  <View key={index}> 
                    {field.section === 'warmup' ? <MovementComponentOption movement={field} deleteMovement={removeMovement} idx={index} /> : null}                                    
                  </View>
              ))} 
           
            
             {
              watch('movements').filter(movement => movement.section === 'main').length != 0 ? <Text style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold"                
              }}>Main movement(s)</Text> : null
            }
            
            {fields.map((field,index) => (
                <View key={index}> 
                  {field.section ===  'main' ? <MovementComponentOption movement={field} deleteMovement={removeMovement} idx={index} /> : null}                                    
                </View>
            ))}
            
            {
              watch('movements').filter(movement => movement.section === 'post').length != 0 ? <Text style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold"                
              }}>Post Movement(s)</Text> : null
            }

            {fields.map((field,index) => (
              <View key={index}> 
                {field.section === 'post' ? <MovementComponentOption movement={field} deleteMovement={removeMovement} idx={index} /> : null}                                    
              </View>
            ))}            
            
          </SafeAreaView>

          <View>
            <Button
              title="Add Movement"
              color="orange"
              onPress={() => {
                console.log("Adding Movement to program");
                navigation.navigate("Create a Movement", {addMovement: addMovement, addSession: addSession, deleteSession: deleteSession, fields: fields, removeMovement: removeMovement});
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
    </LinearGradient>
  );
}
