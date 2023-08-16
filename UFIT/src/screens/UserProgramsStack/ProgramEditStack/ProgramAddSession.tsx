import {
    View,
    Text,
    Button,
    ScrollView,
    TextInput,
    SafeAreaView,
    TouchableOpacity
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
  import MovementComponentOption from "../components/MovementCardOption";
  import FormErrorMsg from "../components/FormErrorMsg";
  import LinearGradient from "../../../components/LinearGradient";
  import { api } from "../../../api";
  import { useUserPrograms } from "../../../provider/UserProgramsContext";
  interface SessionData {
    name: string;
    restDays: string;  
    movements: Object[];
  }

  export type ProgramAddSessionProp = RouteProp<StackParamList, 'Program Add Session'>;

  type ProgramAddSessionProps = {
    navigation: NativeStackNavigationProp<StackParamList, "User Programs">
    route: ProgramAddSessionProp;
  }

  export default function ProgramAddSession({navigation,route}: ProgramAddSessionProps) {
    // Form state management + form validation     
    const { program } = route.params; 
    const { handlePrograms,updateProgram } = useUserPrograms()
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
    const handleSession = async(data:any) => {
      try {
        let handledMovements = await createMovements(data.movements);
        data["movementId"] = handledMovements;
      }catch(err){
        console.log(err);
      }
    }
    // Passed to movement form
    const addMovement = (movement:object) => {
      const movements = getValues('movements') || [];
      setValue('movements', [...movements, movement]);
    }
  
    const removeMovement = (index:number) => {
      const movements = getValues('movements') || [];
      setValue('movements', movements.filter((_,i) => i !== index))
    }


    const onSessionSubmit = async(data:any) => {
        try {
          let movementReq = await handleSession(data);
          data.id = program._id;
          await updateProgram(data);
          await handlePrograms();
          navigation.goBack();
        }catch(err){
          console.log(err);
        }
    }
  

    var movementsLength = watch('movements').length;
    
    return (
     <LinearGradient
        top="#000"
        bottom="#EA9CFD"
        style={{ minHeight: "100%" }}
      >  
      <SafeAreaView>
      <TouchableOpacity>
      <Text style = {{color: 'white'}} onPress = {()=> navigation.goBack()}>
        {"Go back"} 
      </Text>

    </TouchableOpacity>
      {/* <View style={{...creatingStyles.viewContainer}}> */}
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop:15 }}>          
          <ScrollView style={{ height: "90%" }}>
            {/* <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Session
            </Text> */}
            {/* <SafeAreaView style={{ marginTop: 40 }}> */}
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
              
            {/* </SafeAreaView> */}
  
            <View>
              <Button
                title="Add Movement"
                color="orange"
                onPress={() => {
                  navigation.navigate('Program Add Session Movement',
                    {addMovement: addMovement}
                  )
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
      {/* </View> */}
      </SafeAreaView>
      </LinearGradient>
    );
  }
  