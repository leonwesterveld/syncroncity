import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Index() {
  const [selectedValue, setSelectedValue] = useState("");
  const [ddValue, setDdValue] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Button
          title="denk"
          onPress={() => setDdValue("denk")}
        />
        <Button
          title="droom"
          onPress={() => setDdValue("droom")}
        />
        </View>
      

        <View style={styles.section}>
      <Text style={styles.selectedText}>
        You selected: {ddValue}
      </Text>
      </View>
      

      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="javascript" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="C++" value="c++" />
      </Picker>

      <Text style={styles.selectedText}>
        You selected: {selectedValue}
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