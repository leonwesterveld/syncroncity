import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Choises from './choises';
import Profile from './profile';
import Matches from './matches';
import { Ionicons } from "@expo/vector-icons";




const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        // Assign icons based on route names
        if (route.name === "Home") {
          iconName = focused ? "cloud" : "cloud-outline";
        } else if (route.name === "Profiel") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Matches") {
          iconName = focused ? "extension-puzzle-sharp" : "extension-puzzle-outline";
        }

        // Return the Ionicons component
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "black",
      headerShown: false,
    })}
      >
        <Tab.Screen name="Profiel" component={Profile} />
        <Tab.Screen name="Home" component={Choises} />
        <Tab.Screen name="Matches" component={Matches} /> 
    </Tab.Navigator>
  );
}