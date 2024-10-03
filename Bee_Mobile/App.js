import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SavingGoalScreen from './views/SavingGoalSrceen/SavingGoalList';


function HomeScreen() {
    return (
        <View style={{flex: 1, alignItem: 'center', justifyContent: 'center'}}>
            <Text>
                Home Screen
            </Text>
        </View>
    );
}

function AddScreen() {
  return (
    <View >
        <Text>
            Home Screen
        </Text>
    </View>
    );
}

function BudgetScreen() {
  return (
    <View >
        <Text>
            Home Screen
        </Text>
    </View>
    );
}

function ProfileScreen() {
  return (
    <View >
        <Text>
            Home Screen
        </Text>
    </View>
    );
}

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
          screenOptions = {({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let IconComponent;
    
                if (route.name === "Tổng quan") {
                  iconName = "home";
                  IconComponent = FontAwesomeIcon;
                } else if (route.name === "Mục tiêu") {
                  iconName = "account-balance-wallet";
                  IconComponent = MaterialIcon;
                } else if (route.name === "Add") {
                  iconName = "add-circle";
                  IconComponent = MaterialIcon;
                } else if (route.name === "Ngân sách") {
                  iconName = "bank";
                  IconComponent = FontAwesomeIcon;
                } else if (route.name === "Tài khoản") {
                  iconName = "user";
                  IconComponent = FontAwesomeIcon;
                }
                return <IconComponent name={iconName} size={size} color={focused ? color : 'black'} />;
              },
          })}
      >
        <Tab.Screen name="Tổng quan" component={HomeScreen} />
        <Tab.Screen name="Mục tiêu" component={SavingGoalScreen} />
        <Tab.Screen name="Add" component={AddScreen} options={{tabBarLabel: () => null, tabBarIcon: ({ focused }) => (
          <MaterialIcon 
            name="add-circle" 
            size={focused ? 50 : 45} 
            color="#5D0DE1" 
          />
        ),}}/>
        <Tab.Screen name="Ngân sách" component={BudgetScreen} />
        <Tab.Screen name="Tài khoản" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
