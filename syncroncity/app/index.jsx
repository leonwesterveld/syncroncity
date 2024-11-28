import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Index() {
  const [selectedValue, setSelectedValue] = useState("");
  const [ddValue, setDdValue] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const handleButtonPress = (value) => {
    setSelectedButton(value);
    setDdValue(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
      <Button
          title="denk"
          onPress={() => handleButtonPress("denk")}
          color={selectedButton === "denk" ? "#3498db" : "#7f8c8d"}
        />
        <Button
          title="droom"
          onPress={() => handleButtonPress("droom")}
          color={selectedButton === "droom" ? "#3498db" : "#7f8c8d"}
        />
        </View>

      

      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="zo juist" value="zo juist" />
        <Picker.Item label="1 uur geleden" value="1 uur geleden" />
        <Picker.Item label="2 uur geleden" value="2 uur geleden" />
        <Picker.Item label="vandaag" value="vandaag" />
      </Picker>

      <Text style={styles.selectedText}>
        {selectedValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 20,
  },
});