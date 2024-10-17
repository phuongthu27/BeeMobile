import React from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import BudgetScreen from "../screens/BudgetScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TransactionScreen from "../screens/TransactionScreen";
import SavingGoalStackScreen from "./SavingGoalStackScreen";
import Home from "../screens/HomeSreen/Home";
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName;
        let IconComponent;

        if (route.name === "Tổng quan") {
          iconName = "home";
          IconComponent = FontAwesomeIcon;
        } else if (route.name === "Mục tiêu") {
          iconName = "account-balance-wallet";
          IconComponent = MaterialIcon;
        } else if (route.name === "Giao dịch") {
          iconName = "add-circle";
          IconComponent = MaterialIcon;
        } else if (route.name === "Ngân sách") {
          iconName = "bank";
          IconComponent = FontAwesomeIcon;
        } else if (route.name === "Tài khoản") {
          iconName = "user";
          IconComponent = FontAwesomeIcon;
        }

        return {
          tabBarIcon: ({ focused, color, size }) => (
            <IconComponent
              name={iconName}
              size={size}
              color={focused ? color : "black"}
            />
          ),
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Tổng quan" component={Home} />
      <Tab.Screen name="Mục tiêu" component={SavingGoalStackScreen} />
      <Tab.Screen
        name="Giao dịch"
        component={TransactionScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MaterialIcon
              name="add-circle"
              size={focused ? 50 : 45}
              color="#5D0DE1"
            />
          ),
        }}
      />
      <Tab.Screen name="Ngân sách" component={BudgetScreen} />
      <Tab.Screen name="Tài khoản" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
