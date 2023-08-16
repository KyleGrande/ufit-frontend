import { RouteProp } from "@react-navigation/native";
import React from "react";
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
import {
  creatingStyles,
  programStyles,
} from "../../style";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../api";
import FeedBackCard from "../../../components/FeedbackCard";
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
  comment: string | undefined;
  rating: number | 0;
}

export default function ProgramWriteFeedBack({
  navigation,
  route,
}: ProgramWriteFeedBackProps) {
  const { programId, userId } = route.params;

  const { control, handleSubmit, watch } = useForm<feedBackFormData>({
    defaultValues: {
      programId: programId,
      userId: userId,
      comment: "",
      rating: 0,
    },
  });
  const onSubmit = async (data: any) => {
    try {
      let response = await api.post("/feedback", data);
      console.log(response);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <LinearGradient top="#000" bottom="#ffffff" style={{ minHeight: "100%" }}>
      <View
        style={{
          ...creatingStyles.viewContainer,
          paddingRight: 20,
          paddingLeft: 20,
        }}
      >
        <ScrollView>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Review the Program
          </Text>
          <Controller
            control={control}
            name="rating"
            render={({ field, fieldState }) => (
              <View>
                <Text style={{ color: "white", fontSize: 22 }}>
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
                {fieldState?.error && <FormErrorMsg fieldState={fieldState} />}
              </View>
            )}
          />
          <Text style={{ color: "white", fontSize: 22 }}>Any comments?</Text>
          {/* <View style={trackingStyles.singleSessionContainer}> */}
          {/* <Text>
              Rating: {watch('rating')}
            </Text>
            <Text style = {[ {color: 'black'}]}>
                
                "{watch('comment')} "
            </Text> */}
          <FeedBackCard
            username={null}
            rating={watch("rating")}
            comment={watch("comment")}
          />
          {/* </View> */}
          <Controller
            control={control}
            name="comment"
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
                {fieldState?.error && <FormErrorMsg fieldState={fieldState} />}
              </View>
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={programStyles.buttonContainer}
          >
            <Button
              title="Submit Review"
              color="white"
              onPress={handleSubmit(onSubmit)}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
