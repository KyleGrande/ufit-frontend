import { View, Text, Button, ScrollView } from "react-native";
import { creatingStyles } from "../../style";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StackParamList } from "../../UserPrograms";

type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function ProgramSessionCreate({
  navigation,
}: ProgramsMainScreenProps) {
  return (
    <View style={creatingStyles.viewContainer}>
      <View style={{ paddingLeft: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Session
        </Text>
      </View>

      <Button
        title="Add Movement"
        color="orange"
        onPress={() => {
          console.log("Adding Movement to program");
          navigation.navigate('Create a Movement')
        }}
      />
    </View>
  );
}
