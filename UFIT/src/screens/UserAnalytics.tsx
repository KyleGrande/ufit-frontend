import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { styles as globalStyle } from "./style";
import { StackedBarChart } from "react-native-chart-kit";
import { fetchWorkoutHistoryByUserId } from "../service/apiCall";
// import AutocompleteInput from "react-native-autocomplete-input";
import moment from "moment-timezone";
// import { Picker } from "@react-native-picker/picker";
import DropdownExample from "./DropdownExample";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "../components/LinearGradient";
import useAuth from "../hook/useAuth";

const screenWidth = Dimensions.get("window").width;

export default function UserAnalytics() {
  const [workoutHistory, setWorkoutHistory] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // TODO: step1: fetch userId from storage using useAuth hook
  const { _id } = useAuth();

  // HINT: It runs as soon as we move to this screen
  // useEffect can never be async,
  // pass empty array in useEffect as an argument
  // mount phase
  useEffect(() => {
    if (_id) getHistory();

    async function getHistory() {
      // TODO: step2: fetch only those histories that belong to userId who has signed in
      const response = await fetchWorkoutHistoryByUserId(_id || "");
      console.log("response?.data", response?.data);
      setWorkoutHistory(response?.data || []);
      setLoading(false);
    }
  }, [_id]);

  // separate x-axe and y-axe values data from api
  // const labelArray = workoutHistory?.map((iterator: any) => {
  //   //x -axe
  //   const date = new Date(iterator?.date);
  //   const label = moment(date).format("MMMM D");
  //   console.log("label", label);
  //   return label || "default";
  // });
  // const dataArray = workoutHistory?.map((iterator: any) => [
  //   //y-axe
  //   iterator?.movements?.length || 0,
  // ]);

  // const labelArray: any = [];
  // const dataArray: any = [];
  const { dataArray, labelArray } = divideArrayIntoGroups(workoutHistory, 2);

  console.log("dataArray", dataArray);
  console.log("labelArray", labelArray);

  // function groupData(workoutHistory: any) {
  //   const groupNumber = Number(
  //     workoutHistory.length / workoutHistory.length > 5 ? 6 : 1
  //   );
  //   let count = 0;
  //   const labelArray: any = [];
  //   const dataArray: any = [];

  //   const tempLabel: any = [];
  //   const tempDate: any = [];

  //   workoutHistory.forEach((iterator: any, index: number) => {
  //     console.log("index", index);
  //     console.log("groupNumber", groupNumber);
  //     let date;
  //     let label = "";
  //     try {
  //       date = new Date(iterator?.date || Date.now());
  //       label = moment(date).format("MMMM D") || "null";
  //     } catch (error) {
  //       label = "none";
  //     }

  //     if (!(workoutHistory.length > 5)) {
  //       labelArray.push(label);
  //       dataArray.push(iterator?.movements?.length || 0);
  //     } else {
  //       tempLabel.push(label);
  //       tempDate.push(iterator?.movements?.length || 0);
  //     }
  //   });

  //   return { labelArray, dataArray };
  // }

  function divideArrayIntoGroups(arr: any, groupSize: number) {
    const groups = [];
    let index = 0;

    while (index < arr.length) {
      groups.push(arr.slice(index, index + groupSize));
      index += groupSize;
    }

    const labelArray: any = [];
    const dataArray: any = [];

    for (const iterator of groups) {
      labelArray.push(combineLabels(iterator));
      dataArray.push([combineMovements(iterator)]);
    }

    return { labelArray, dataArray };
  }

  function combineLabels(array: any) {
    let label = "";
    array?.forEach((element: any, index: number) => {
      console.log("element", element?.movements?.length);
      if (index === 0 || index === array.length - 1) {
        const date = new Date(element?.date);
        label = moment(date).format("MMMM D") || "none";
      }
    });
    return label;
  }

  function combineMovements(array: any) {
    let count = 0;
    array?.forEach((element: any, index: number) => {
      console.log("element", element);
      count = count + element?.movements?.length || 0;
      // count = count + index;
    });
    return count;
  }

  const options = workoutHistory?.map((item: any, index: number) => ({
    ...item,
    label: item?.sessionName,
    value: item?._id || index,
  }));

  const [selectedValue, setSelectedValue] = useState<any>(null);

  const handleSelect = (value: any) => {
    setSelectedValue(value || null);
    console.log("--------------------------------------------");
    console.log("value", value?.movements);
    console.log("--------------------------------------------");
  };

  return (
    <LinearGradient
      top="#FCC064"
      bottom="#EA9CFD"
      style={{ minHeight: "100%" }}
    >
      <View style={globalStyle.viewContainer}>
        {/* <Text style={globalStyle.titleBarText}> */}
        <ScrollView>
          {/* <View> */}

          <SafeAreaView>
            <Text style={globalStyle.titleBarText}>Analytics</Text>
            <StackedBarChart
              // style={styles.chart}
              data={{
                labels: labelArray,
                legend: ["Movements"],
                data: dataArray,
                barColors: ["#4CAF50", "#297AB1", "#FFA726"], // Customize bar colors
              }}
              width={screenWidth - 10}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0, // No decimal places for data values
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Customize label color
                style: {
                  borderRadius: 16,
                },
              }}
              hideLegend={false}
            />

            <DropdownExample
              options={options}
              selectedValue={selectedValue}
              onSelect={handleSelect}
            />

            <FlatList
              data={selectedValue?.movements || null}
              renderItem={({ item }: any) => (
                <View style={styles.card} key={item?._id}>
                  <Text style={styles.title}>{item?.movementName}</Text>

                  {item?.trackingData?.trackingType ||
                  item?.trackingData?.trackingType === 0 ? (
                    <Text style={styles.content}>
                      {item?.trackingData?.trackingType}
                    </Text>
                  ) : null}

                  {item?.trackingData?.speed ||
                  item?.trackingData?.speed === 0 ? (
                    <Text style={styles.content}>
                      {"speed: " + item?.trackingData?.speed}
                    </Text>
                  ) : null}

                  {item?.trackingData?.rounds ||
                  item?.trackingData?.rounds === 0 ? (
                    <Text style={styles.content}>
                      {"rounds: " + item?.trackingData?.rounds}
                    </Text>
                  ) : null}

                  {item?.trackingData?.roundMin &&
                    item?.trackingData?.roundSec && (
                      <Text style={styles.content}>
                        {"round time: " +
                          item?.trackingData?.roundMin +
                          ":" +
                          item?.trackingData?.roundSec}
                      </Text>
                    )}

                  {item?.trackingData?.restMin &&
                    item?.trackingData?.restSec && (
                      <Text style={styles.content}>
                        {"rest time: " +
                          item?.trackingData?.restMin +
                          ":" +
                          item?.trackingData?.restSec}
                      </Text>
                    )}

                  {item?.trackingData?.genMin && item?.trackingData?.genSec && (
                    <Text style={styles.content}>
                      {"gen time: " +
                        item?.trackingData?.genMin +
                        ":" +
                        item?.trackingData?.genSec}
                    </Text>
                  )}

                  {item?.trackingData?.sets ||
                  item?.trackingData?.sets === 0 ? (
                    <Text style={styles.content}>
                      {"sets: " + item?.trackingData?.sets}
                    </Text>
                  ) : null}

                  {item?.trackingData?.reps ||
                  item?.trackingData?.reps === 0 ? (
                    <Text style={styles.content}>
                      {"reps: " + item?.trackingData?.reps}
                    </Text>
                  ) : null}

                  {item?.trackingData?.weight ||
                  item?.trackingData?.weight === 0 ? (
                    <Text style={styles.content}>
                      {"weight: " + item?.trackingData?.weight}
                    </Text>
                  ) : null}

                  {/* {item?.trackingData?.weight !== undefined &&
                    item?.trackingData?.weight === 0 && (
                      <Text style={styles.content}>
                        {"weight: " + (item?.trackingData?.weight || "null")}
                      </Text>
                    )} */}
                </View>
              )}
              keyExtractor={(item: any, index) => item?._id}
              contentContainerStyle={styles.listContent}
            />
          </SafeAreaView>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    flexDirection: "column", // The default, but explicitly set for clarity
    alignItems: "center", // This centers the children horizontally
    justifyContent: "center", // This centers the children vertically
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    marginBottom: 10, // Add margin between the boxes
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: "#F5FCFF",
    marginTop: 8,
  },
  infoText: {
    textAlign: "center",
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#555",
  },
  listContent: {
    padding: 16,
  },
});

function getDummyWorkout() {
  const array: any = [
    {
      userId: "64c1963d4566e9992bebffe2",
      programId: "64c1963d4566e9992bebffe2",
      sessionName: "Sunday",
      restDays: 4,
      date: "2023-07-06",
      movements: [
        {
          section: "section1",
          movementName: "movement1",
          trackingData: {
            trackingType: "rounds",
            sets: 10,
            reps: 10,
            weight: 50,
            roundMin: 20,
            roundSec: 38,
          },
        },
        {
          section: "section2",
          movementName: "movement2",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
        {
          section: "section3",
          movementName: "movement3",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
        {
          section: "section3",
          movementName: "movement3",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
      ],
    },
    {
      userId: "64c1963d4566e9992bebffe2",
      programId: "64c1963d4566e9992bebffe2",
      sessionName: "Monday session",
      restDays: 4,
      date: "2023-07-06",
      movements: [
        {
          section: "section1",
          movementName: "movement1",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            weight: 50,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 5,
          },
        },
        {
          section: "section2",
          movementName: "movement2",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
        {
          section: "section3",
          movementName: "movement3",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
        {
          section: "section3",
          movementName: "movement3",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
      ],
    },
    {
      userId: "64c1963d4566e9992bebffe2",
      programId: "64c1963d4566e9992bebffe2",
      sessionName: "Saturday",
      restDays: 4,
      date: "2023-08-06",
      movements: [
        {
          section: "section1",
          movementName: "movement1",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
        {
          section: "section2",
          movementName: "movement2",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
      ],
    },
    {
      userId: "64c1963d4566e9992bebffe2",
      programId: "64c1963d4566e9992bebffe2",
      sessionName: "Wednesday",
      restDays: 4,
      date: "2023-08-10",
      movements: [
        {
          section: "section3",
          movementName: "movement3",
          trackingData: {
            trackingType: "timer",
            speed: 5,
            rounds: 10,
            roundMin: 20,
            roundSec: 38,
            restMin: 59,
            restSec: 24,
            genMin: 48,
            genSec: 55,
          },
        },
      ],
    },
  ];
  return array;
}
