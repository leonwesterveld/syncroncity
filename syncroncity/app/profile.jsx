import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";


export default function Profile() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Profile Pagina</Text>
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