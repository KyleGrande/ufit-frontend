
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
import API, { Program, Session } from '../../api';

// used for calling navigation ina type safe way
type ProgramsMainScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "User Programs">;
};

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
    const [programs, setPrograms] = React.useState<Program[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        API.getPrograms().then((response) => {
            console.log(response.data);
            setPrograms(response.data.data);
            setError(null);
        })
        .catch((err) => {
            console.log(err);
            setError('Error retrieving data');
        });
    }, []);
    
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
