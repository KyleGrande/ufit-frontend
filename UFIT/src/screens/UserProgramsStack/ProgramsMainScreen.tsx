import * as React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StackParamList } from "../UserPrograms";
import { programStyles } from "../style";
import LinearGradient from "../../component/LinearGradient";
import Icon from "react-native-vector-icons/FontAwesome";

//dummy data
const programs = [
  {
    _id: { $oid: "64a1dd06bc920f83ce2d357b" },
    programName: "Strength 5x5",
    programDescription: "A high intensity strength building program.",
    programCategory: "strength training",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    session: [
      {
        name: "Saturday Session",
        movementId: ["64a1cd444ad713a91cc690d2", "64a1cd444ad713a91cc690d3"],
        _id: "64a1dd06bc920f83ce2d357c",
      },
      {
        name: "Friday Session",
        movementId: ["64a1cd444ad713a91cc690d2", "64a1cd444ad713a91cc690d3"],
        _id: "64a1dd06bc920f83ce2d357d",
      },
    ],
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a1d8a16724507e67f033ec" },
    programName: "Monster Builder",
    programDescription: "An extreme program for muscle growth and power.",
    programCategory: "bodybuilding",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a1d8b16724507e67f033ed" },
    programName: "Lean Machine",
    programDescription: "Shed fat and build lean muscle with this program.",
    programCategory: "weight loss",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a1d8b16724507e67f033ef" },
    programName: "Zen Balance",
    programDescription: "A yoga program focused on balance and mindfulness.",
    programCategory: "yoga",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a1d8b16724507e67f033eh" },
    programName: "Cardio Rush",
    programDescription: "Intense cardio workouts to get your heart pumping.",
    programCategory: "cardio",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a1d8b16724507e67f033ei" },
    programName: "Pilates Pro",
    programDescription:
      "A challenging Pilates program for experienced practitioners.",
    programCategory: "pilates",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a1d8b16724507e67f033ej" },
    programName: "Barbell Buster",
    programDescription:
      "A challenging Pilates program for experienced practitioners.",
    programCategory: "pilates",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a1d8b16724507e67f033ek" },
    programName: "Chin-up Champion",
    programDescription:
      "A challenging Pilates program for experienced practitioners.",
    programCategory: "pilates",
    userId: { $oid: "64a1d8706724507e67f033e9" },
    __v: { $numberInt: "0" },
  },
];
// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

// need to define Program for ts
export type Program = {
  _id: { $oid: string };
  programName: string;
  programDescription: string;
  programCategory: string;
  userId: { $oid: string };
  session: Session[];
  __v: { $numberInt: string };
};
// same for Session
export interface Session {
  name: string;
  movementId: Array<string>;
  _id: string;
}

const bgColor = [
  {
    top: "#2E34BC",
    bottom: "#EA9CFD",
  },
  {
    top: "#0D6817",
    bottom: "#FFEB3A",
  },
];

export default function ProgramsMainScreen({
  navigation,
}: ProgramsMainScreenProps) {
  return (
    <View>
      <LinearGradient
        top="#FCC064"
        bottom="#EA9CFD"
        style={{ minHeight: "100%" }}
      >
        <View style={programStyles.viewContainer}>
          <Text style={programStyles.titleBarText}>Your Programs</Text>

          <ScrollView
            style={programStyles.programsContainer}
            showsVerticalScrollIndicator={false}
          >
            {programs.map((program, index) => {
              const [first, second] = bgColor;
              let top = index % 2 === 0 ? first.top : second.top;
              let bottom = index % 2 === 0 ? first.bottom : second.bottom;

              return (
                <LinearGradient
                  key={program._id.$oid}
                  top={top}
                  bottom={bottom}
                  style={{ marginBottom: 12, borderRadius: 10 }}
                >
                  <Pressable
                    style={[
                      {
                        padding: 12,
                      },
                    ]}
                    onPress={() =>
                      navigation.navigate("Track a Program", { program })
                    }
                  >
                    <Text style={programStyles.programTitle}>
                      {program.programName}
                    </Text>
                  </Pressable>
                </LinearGradient>
              );
            })}
          </ScrollView>

          <View
            style={{ ...programStyles.touchableOpacityStyle, marginTop: 0 }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Create a Program")}
            >
              {/* <Button
                title="Create Program"
                color="#504444"
                onPress={() => navigation.navigate("Create a Program")}
              /> */}
              <Text
                style={{
                  color: "#ebe2e2",
                  backgroundColor: "#000",
                  fontWeight: "bold",
                  padding: 12,
                  borderRadius: 10,
                  opacity: 0.7,
                  overflow: "hidden",
                }}
              >
                Create Program
                <Icon
                  name="plus"
                  color="white"
                  style={{ marginLeft: 5, textAlign: "center" }}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
