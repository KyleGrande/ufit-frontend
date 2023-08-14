import { RouteProp } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import FormErrorMsg from "../components/FormErrorMsg";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { StackParamList } from "../../UserPrograms";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LinearGradient from "../../../components/LinearGradient";
import { creatingStyles } from "../../style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import {api} from '../../../api';
export type ProgramWriteFeedBackProp = RouteProp<
  StackParamList,
  "Write Feedback"
>;

type ProgramWriteFeedBackProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
  route: ProgramWriteFeedBackProp;
};

interface feedBackFormData {
    programId: string | undefined;
    userId: string | undefined;
    comment:string | undefined;
    rating: number | 0;    
}


export default function ProgramWriteFeedBack({
  navigation,
  route,
}: ProgramWriteFeedBackProps) {
  const { programId, userId } = route.params;
  
  const {
    control,
    handleSubmit,
    watch
  } = useForm<feedBackFormData>({
    defaultValues: {
        programId: programId,
        userId: userId,
        comment: '',
        rating: 0
    }
  });
  const onSubmit = async(data:any) => {
    try {
        let response = await api.post('/feedback', data);
        console.log(response);
        navigation.goBack();
    } catch(err){
        console.log(err);
    }    
  }
  return (
    <LinearGradient top="#000" bottom="#EA9CFD" style={{ minHeight: "100%" }}>
      <View
        style={{
          ...creatingStyles.viewContainer,
          paddingRight: 20,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "white" }}>Go Back</Text>
        </TouchableOpacity>
        <ScrollView>          
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Write Feedback!
          </Text>
          
          <SafeAreaView>
            <Controller
                control = {control}
                name = "rating"
                render={({ field, fieldState }) => (
                    <View>
                        <Text style = {{color: 'white', fontSize: 22}}>
                            Rating(Out of 10):
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
                            <Picker.Item label="0" value={0} />
                            <Picker.Item label="1" value={1} />                            
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                            <Picker.Item label="5" value={5} />
                            <Picker.Item label="6" value={6} />
                            <Picker.Item label="7" value={7} />
                            <Picker.Item label="8" value={8} />
                            <Picker.Item label="9" value={9} />
                            <Picker.Item label="10" value={10} />
                          </Picker>
                          {fieldState?.error && (
                            <FormErrorMsg fieldState={fieldState} />
                          )}
                    </View>
                )}
            />
            <Text style = {{color: 'white', fontSize: 22}}>
                            Any comments?
            </Text>
            
            <Text style = {{color: 'yellow'}}>
                {watch('comment')}
            </Text>
            
            <Controller
                control = {control}
                name = "comment"
                render={({ field, fieldState }) => (
                    <View>
                        
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
                            placeholder=""
                            placeholderTextColor="white"
                        />
                        {fieldState?.error && (
                            <FormErrorMsg fieldState={fieldState} />
                        )}
                    </View>
                    
                )}
                
            />
            
          </SafeAreaView>        
        </ScrollView>
        <Button
            title="Submit Feedback"
            color="yellow"
            onPress={handleSubmit(onSubmit)}
        />
      </View>
    </LinearGradient>
  );
}
