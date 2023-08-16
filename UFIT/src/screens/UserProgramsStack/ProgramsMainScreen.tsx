import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../UserPrograms";
import { programStyles } from "../style";
import LinearGradient from "../../components/LinearGradient";
import { getGradientColors } from "../../components/getGradient";
import { AntDesign } from "@expo/vector-icons";
import { CreateModal } from "./CreateModal";
import { useUserPrograms } from "../../provider/UserProgramsContext";

// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

export default function ProgramsMainScreen({
  navigation,
}: ProgramsMainScreenProps) {
  const { programs } = useUserPrograms();
  const [programData, setProgramData] = React.useState(programs);
  const [createModalVisble, setCreateModalVisible] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setProgramData(programs);
  }, [programs]);

  const handleCreatePress = React.useCallback(() => {
    setCreateModalVisible(true);
  }, [setCreateModalVisible]);

  return (
    <SafeAreaView>
      <View style={programStyles.viewContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={programStyles.titleBarText}>Your Programs</Text>
          <TouchableOpacity
            style={{ paddingRight: 30 }}
            onPress={handleCreatePress}
          >
            <AntDesign
              name="plus"
              size={30}
              color="orange"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={programStyles.programsContainer}>
          {programData?.map((program, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("Track a Program", { program })
              }
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <LinearGradient
                top={
                  getGradientColors(program.programCategory.toLowerCase())[0]
                }
                bottom={
                  getGradientColors(program.programCategory.toLowerCase())[1]
                }
                style={programStyles.singleProgramContainer}
              >
                <Text style={programStyles.programTitle}>
                  {program.programName}
                </Text>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <CreateModal
        modalVisible={createModalVisble}
        setModalVisible={setCreateModalVisible}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
