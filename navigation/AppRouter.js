import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AdminLogin from "../app/AdminLogin";
import AdminPanel from "../app/AdminPanel"; // Bunu da birazdan yapacaksın

const Stack = createNativeStackNavigator();

const AppRouter = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Main" 
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="AdminLogin" 
      component={AdminLogin}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="AdminPanel" 
      component={AdminPanel}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppRouter;
