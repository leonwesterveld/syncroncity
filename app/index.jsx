import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TextInput, Picker } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

const API_URL = "http://localhost:5000";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!name || !password) {
      setAlertMessage("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
      } else {
        setAlertMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setAlertMessage("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      setAlertMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlertMessage(data.message);
        setIsLogin(true);
      } else {
        setAlertMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setAlertMessage("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  const handleLogout = async () => { 
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
      setAlertMessage("Logged out successfully.");
    } catch (error) {
      setAlertMessage("Failed to log out.");
    }
  };

  if (!isLoggedIn) {
    return (
<<<<<<< HEAD
      <>
        <View style={styles.container}>
          {isLogin ? (
            <View style={styles.form}>
              <Text style={styles.header}>Login</Text>
              <TextInput
                style={styles.login}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.login}
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
          ) : (
            <View style={styles.form}>
              <Text style={styles.header}>Register</Text>
              <TextInput
                style={styles.login}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.login}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.login}
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
        {alertMessage && <Text style={styles.alertText}>{alertMessage}</Text>}
    </>
=======
      <LinearGradient
        colors={['#FF76CE', '#F72C5B']}
        style={styles.container} // Container styles hier gebruiken
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      >
        {isLogin ? (
          <View style={styles.formLogin}>
            <Text style={styles.header}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Go to Register" onPress={() => setIsLogin(false)} />
          </View>
        ) : (
          <View style={styles.formRegister}>
            <Text style={styles.header}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <Button title="Go to Login" onPress={() => setIsLogin(true)} />
          </View>
        )}
        {alertMessage && <Text style={styles.alertText}>{alertMessage}</Text>}
      </LinearGradient>
>>>>>>> 8d38ec29fc4d3291333cf69869113892f2fef189
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "cloud" : "cloud-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Matches") {
            iconName = focused ? "extension-puzzle-sharp" : "extension-puzzle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Profile">
        {() => <Profile user={user} onLogout={handleLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Home">
        {() => <Choises user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Matches" component={Matches} />
    </Tab.Navigator>
  );
}

function Profile({ user, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Phone: {user.phone}</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

function Choises({ user }) {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleButtonPress = (value) => {
    setSelectedButton(value);
    setAlertMessage(`You selected ${value}`);
  };

  const handleSaveChoices = async () => {
    if (!selectedButton) {
      setAlertMessage("Please select either 'denk' or 'droom' first.");
      return;
    }

    const endpoint =
      selectedButton === "denk"
        ? `${API_URL}/Gedachtes`
        : `${API_URL}/Dromen`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          selectedValue: selectedValue === "other" ? customValue : selectedValue,
          timeValue,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Choices saved successfully.");
      } else {
        setAlertMessage(data.message || "Failed to save choices.");
      }
    } catch (error) {
      setAlertMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
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
            onValueChange={(value) => setSelectedValue(value)}
          >
            <Picker.Item label="ding1" value="ding1" />
            <Picker.Item label="ding2" value="ding2" />
            <Picker.Item label="ding3" value="ding3" />
            <Picker.Item label="ding4" value="ding4" />
            <Picker.Item label="other" value="other" />
          </Picker>
          {selectedValue === "other" && (
            <TextInput
              style={styles.textInput}
              placeholder="Enter"
              value={customValue}
              onChangeText={setCustomValue}
            />
          )}
        </View>

        <Picker
          selectedValue={timeValue}
          style={styles.picker}
          onValueChange={(value) => setTimeValue(value)}
        >
          <Picker.Item label="zo juist" value="zojuist" />
          <Picker.Item label="1 uur geleden" value="1uur" />
          <Picker.Item label="2 uur geleden" value="2uur" />
          <Picker.Item label="vandaag" value="vandaag" />
          <Picker.Item label="gister" value="gister" />
        </Picker>

        <Button title="Save Choices" onPress={handleSaveChoices} />
        </View>
      {alertMessage && <Text style={styles.alertText}>{alertMessage}</Text>}
  </>
  );
}

function Matches() {
  return (
    <View style={styles.container}>
      <Text>Matches screen</Text>
    </View>
  );
}

<LinearGradient
    colors= {["#FF76CE" , "F72C5B",]} 
    start={{x: 0.3, y: 0}}
    end={{x: 0.7, y: 1}}
  />

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
    gap: 10,
  },
  form: {
    marginBottom: 20,
=======
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E73879',
    padding: 20,
    gap: 10,
  },


  formRegister: {
    width: '100%',
    height:'60%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    gap:50,
>>>>>>> 8d38ec29fc4d3291333cf69869113892f2fef189
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  login: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  alertText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    gap: 10,
  },
  section2: {
    flexDirection: "column",
    gap: 10,
    width: 200,
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  textInput: {
    backgroundColor: "#eee",
    height: 50,
    width: 150,
    borderColor: "#eee",
    borderWidth: 1,
    paddingLeft: 10,
  },
});
