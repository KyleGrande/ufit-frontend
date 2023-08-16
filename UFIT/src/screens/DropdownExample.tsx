import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const Dropdown = ({ options, selectedValue, onSelect }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: any) => {
    setModalVisible(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedValueContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedValueText}>
          {selectedValue?.sessionName || "Select a Date"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={{flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 40,
                        backgroundColor: 'rgba(0,0,0,0.5)'}} 
                onPress={() => setModalVisible(false)} 
                onStartShouldSetResponder={() => true}>
        <View style={{
                    // backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 20,
                    minWidth: 300,
                    minHeight: 200,
                flexDirection: 'row',
            justifyContent: 'space-around'}} 
                onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item?.value?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <View>
                    <Text style={styles.optionText}>{item?.date.toString().split("T")[0]}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
    width: screenWidth - 20,
  },
  selectedValueContainer: {
    flex: 1,
  },
  selectedValueText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    width: 200,
    maxHeight: 200,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 18,
  },
});

export default Dropdown;
