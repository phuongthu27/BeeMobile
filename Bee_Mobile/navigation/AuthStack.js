import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import TabNavigator from '../navigation/TabNavigator';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default AuthStack;
