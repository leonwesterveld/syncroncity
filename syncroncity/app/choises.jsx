import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Choises() {
    const [selectedValue, setSelectedValue] = useState("");
    const [timeValue, setTimeValue] = useState("");
    const [selectedButton, setSelectedButton] = useState("");
    const [textInputValue, setTextInputValue] = useState("");
  
    const handleButtonPress = (value) => {
      setSelectedButton(value);
    };
  
    return (
      <View style={styles.container}> 
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
  
        <View style={styles.section2}>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="ding1" value="ding1" />
            <Picker.Item label="ding2" value="ding2" />
            <Picker.Item label="ding3" value="ding3" />
            <Picker.Item label="ding4" value="ding4" />
            <Picker.Item label="other" value="other" />
          </Picker>
          {selectedValue === "other" ? (
            <TextInput
              style={styles.textInput}
              placeholder="Enter"
              value={textInputValue}
              onChangeText={setTextInputValue}
            />
          ) : null}
        </View>
  
        <Picker
          selectedValue={timeValue}
          style={styles.picker}
          onValueChange={(itemValue) => setTimeValue(itemValue)}
        >
          <Picker.Item label="zo juist" value="zojuist" />
          <Picker.Item label="1 uur geleden" value="1uur" />
          <Picker.Item label="2 uur geleden" value="2uur" />
          <Picker.Item label="vandaag" value="vandaag" />
          <Picker.Item label="gister" value="gister" />
        </Picker>
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
});