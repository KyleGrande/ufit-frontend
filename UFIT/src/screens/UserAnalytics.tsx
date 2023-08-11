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
import { FeedStyles, programStyles, styles as globalStyle } from "./style";
import { StackedBarChart } from "react-native-chart-kit";
import { fetchWorkoutHistoryByUserId } from "../service/apiCall";
// import AutocompleteInput from "react-native-autocomplete-input";
import moment from "moment-timezone";
// import { Picker } from "@react-native-picker/picker";
import DropdownExample from "./DropdownExample";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "../components/LinearGradient";
import useAuth from "../hook/useAuth";
import { IHistory } from "../interface/IHistory";

// Define the width of the screen width to adjust the chart's width accordingly.
const screenWidth = Dimensions.get("window").width;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function UserAnalytics() {
  // // State variables
  const [workoutHistory, setWorkoutHistory] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // TODO: step1: fetch userId from storage using useAuth hook
  const { _id, token } = useAuth();

  // HINT: It runs as soon as we move to this screen
  // useEffect can never be async,
  // pass empty array in useEffect as an argument
  // mount phase

  // Effect hook to fetch workout history when _id and token change
  useEffect(() => {
    if (_id) getHistory();

    async function getHistory() {
      // TODO: step2: fetch only those histories that belong to userId who has signed in
      const response = await fetchWorkoutHistoryByUserId(
        _id || ""
        // token || ""
      );
      console.log("response?.data", response?.data);
      // Modify and update workout history data
      const modified = response?.data?.map((iterator: IHistory) => {
        return {
          ...iterator,
          date: !iterator?.date ? new Date() : iterator?.date,
        };
      });
      setWorkoutHistory(modified || []);
      setLoading(false);
    }
  }, [_id]);

  // Group workout history data by months
  const { dataArray, labelArray } = groupDataByMonths(workoutHistory);

  // Helper function to group data by months
  function groupDataByMonths(array: any) {
    const dict = array?.reduce((result: any, currentValue: any) => {
      const date = new Date(currentValue?.date);
      const monthIndex = date.getMonth();
      const month = monthNames[monthIndex] || "none";

      if (!result[month]) result[month] = [];

      result[month].push(currentValue);
      return result;
    }, {});

    console.log("groupedDataByMonths", dict);
    // Prepare data arrays for the chart
    const dataArray: any = [];
    const labelArray: any = [];

    for (const key in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        const element = dict[key];
        labelArray.push(key);
        dataArray.push([combineMovements(element)]);
      }
    }

    return { dataArray, labelArray };
  }

  console.log("dataArray", dataArray);
  console.log("labelArray", labelArray);
  // Helper function to combine movements and count their total
  function combineMovements(array: any) {
    let count = 0;
    array?.forEach((element: any, index: number) => {
      count += element?.movements?.length || 0;
    });
    return count;
  }
  // Create options for the dropdown menu
  const options = workoutHistory?.map((item: any, index: number) => ({
    ...item,
    label: item?.sessionName,
    value: item?._id || index,
  }));
  // State variable for the selected dropdown value
  const [selectedValue, setSelectedValue] = useState<any>(null);
  // Handle dropdown selection
  const handleSelect = (value: any) => {
    setSelectedValue(value || null);
    console.log("--------------------------------------------");
    console.log("value", value?.movements);
    console.log("--------------------------------------------");
  };
  // Loading state handling
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    // <LinearGradient
    //   top="#ffffff"
    //   bottom="#ffffff"
    //   style={{ minHeight: "100%" }}
    // >
    <SafeAreaView>
      <View style={{...FeedStyles.viewContainer }}>
        {/* <Text style={globalStyle.titleBarText}> */}
        <Text style={{ ...FeedStyles.titleBarText}}>
          Analytics
        </Text>

        <ScrollView style={{ marginTop:20}}>
          {/* <View> */}

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
              scrollEnabled={false}
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
        </ScrollView>
      </View>
      </SafeAreaView>
    // </LinearGradient>
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
