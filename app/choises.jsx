import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Choises() {
  const [selectedButton, setSelectedButton] = useState("");

  // State for "denk" mode
  const [denkChoice, setDenkChoice] = useState({
    selectedValue: "",
    textInputValue: "",
    timeValue: "",
  });

  // State for "droom" mode
  const [droomChoice, setDroomChoice] = useState({
    selectedValue: "",
    textInputValue: "",
    timeValue: "",
  });

  // Determine which state to use based on selected button
  const currentChoice = selectedButton === "denk" ? denkChoice : droomChoice;

  // Function to update the correct state based on selected mode
  const updateChoice = (field, value) => {
    if (selectedButton === "denk") {
      setDenkChoice({ ...denkChoice, [field]: value });
    } else if (selectedButton === "droom") {
      setDroomChoice({ ...droomChoice, [field]: value });
    }
  };

  const handleButtonPress = (value) => {
    setSelectedButton(value);

    // Specific logic for each mode
    if (value === "denk") {
      console.log("");
    } else if (value === "droom") {
      console.log("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Button Section */}
      <View style={styles.section}>
        <Button
          title="denk"
          onPress={() => handleButtonPress("denk")}
          color={selectedButton === "denk" ? "red" : "#7f8c8d"}
        />
        <Button
          title="droom"
          onPress={() => handleButtonPress("droom")}
          color={selectedButton === "droom" ? "red" : "#7f8c8d"}
        />
      </View>
     
      

      {/* Picker Section */}
      <View style={styles.section2}>
        <Picker
          selectedValue={currentChoice.selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => updateChoice("selectedValue", itemValue)}
        >
          <Picker.Item label="ding1" value="ding1" />
          <Picker.Item label="ding2" value="ding2" />
          <Picker.Item label="ding3" value="ding3" />
          <Picker.Item label="ding4" value="ding4" />
          <Picker.Item label="other" value="other" />
        </Picker>
        {currentChoice.selectedValue === "other" && (
          <TextInput
            style={styles.textInput}
            placeholder="Enter"
            value={currentChoice.textInputValue}
            onChangeText={(value) => updateChoice("textInputValue", value)}
          />
        )}
      </View>
      

      {/* Time Picker Section */}
      <Picker
        selectedValue={currentChoice.timeValue}
        style={styles.picker}
        onValueChange={(itemValue) => updateChoice("timeValue", itemValue)}
      >
        <Picker.Item label="zo juist" value="zojuist" />
        <Picker.Item label="1 uur geleden" value="1uur" />
        <Picker.Item label="2 uur geleden" value="2uur" />
        <Picker.Item label="vandaag" value="vandaag" />
        <Picker.Item label="gister" value="gister" />
      </Picker>
      <Button
          title="Submit"
          
        />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    gap: 10,
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  section2: {
    flexDirection: "column",
    gap: 10,
    position: "relative",
    width: 200,
  },
  textInput: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: "#eee",
    height: 50,
    width: 150,
    borderColor: "#eee",
    borderWidth: 1,
    paddingLeft: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
