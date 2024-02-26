import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";

import Details from "./pages/Details";
import Payment from "./pages/Payment";
import TabNavigator from "./navigators/TabNavigator";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
