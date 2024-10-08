import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Auth/Login';

const Stack = createStackNavigator();

function AuthStack() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  );
}

export default AuthStack;
