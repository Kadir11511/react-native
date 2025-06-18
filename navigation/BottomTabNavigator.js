// BottomTabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../components/Home/Home";
import AracModelleri from "../screens/AracModelleri";
import AracKiralama from "../screens/AracKiralama";
import About from "../app/hakkimizda"; // veya "../About"

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen 
      name="Ana Sayfa" 
      component={Home} 
      options={{ headerShown: true, title: "Ana Sayfa" }} // ← Geri tuşu için açık!
    />
    <HomeStack.Screen 
      name="Araç Kiralama" 
      component={AracKiralama} 
      options={{ headerShown: true, title: "Araç Kiralama" }} // ← Geri tuşu için açık!
    />
  </HomeStack.Navigator>
);

const AracStack = createNativeStackNavigator();
const AracStackScreen = () => (
  <AracStack.Navigator>
    <AracStack.Screen 
      name="Araç Modelleri" 
      component={AracModelleri} 
      options={{ headerShown: true, title: "Araç Modelleri" }} // ← Geri tuşu için açık!
    />
    <AracStack.Screen 
      name="Araç Kiralama" 
      component={AracKiralama} 
      options={{ headerShown: true, title: "Araç Kiralama" }} // ← Geri tuşu için açık!
    />
  </AracStack.Navigator>
);

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Ana Sayfa" 
      component={HomeStackScreen} 
      options={{ headerShown: false }} 
    />
    <Tab.Screen 
      name="Araç Bilgileri" 
      component={AracStackScreen} 
      options={{ headerShown: false }} 
    />
    <Tab.Screen 
      name="Hakkımızda" 
      component={About} 
      options={{ headerShown: false }} 
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
