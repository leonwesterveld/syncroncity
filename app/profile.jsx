import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, } from "react-native";

// Base URL of your backend API
const API_BASE_URL = "http://localhost:5000";

export default function App() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Store logged in user details

  // Handle Registration
  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
        setIsLogin(true);
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Error", "Both fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", `Welcome back, ${data.user.name}!`);
        setUser(data.user); // Store user details
        setIsLogin(false); // Switch to profile view
      } else {
        Alert.alert("Error", data.message || "Login failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null); // Clear user data
    setIsLogin(true); // Switch to login page
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        // Login Page
        <View style={styles.form}>
          <Text style={styles.header}>Login</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
          <Button
            title="Go to Register"
            onPress={() => setIsLogin(false)}
            color="#6c63ff"
          />
        </View>
      ) : user ? (
        // Profile Page after Login
        <View style={styles.form}>
          <Text style={styles.header}>Profile</Text>
          <Text>Name: {user.name}</Text>
          <Text>Phone: {user.phone}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        // Registration Page
        <View style={styles.form}>
          <Text style={styles.header}>Register</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Register" onPress={handleRegister} />
          <Button
            title="Go to Login"
            onPress={() => setIsLogin(true)}
            color="#6c63ff"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
});
