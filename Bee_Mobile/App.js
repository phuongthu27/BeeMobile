import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SavingGoalScreen from './screens/SavingGoalSrceen/SavingGoalList';
import SavingGoalAdd from './screens/SavingGoalSrceen/SavingGoalAdd';
import SavingGoalEdit from './screens/SavingGoalSrceen/SavingGoalEdit';
import SavingGoalDetail from './screens/SavingGoalSrceen/SavingGoalDetail';
import HomeScreen from './screens/HomeScreen';
import BudgetScreen from './screens/BudgetScreen';
import ProfileScreen from './screens/ProfileScreen';
import TransactionScreen from './screens/TransactionScreen';
import AuthStack from './navigation/AuthStack';
import TabNavigator from './navigation/TabNavigator';

// Tạo Stack Navigator cho SavingGoal
const SavingGoalStack = createStackNavigator();

function SavingGoalStackScreen() {
  return (
    <SavingGoalStack.Navigator>
      <SavingGoalStack.Screen 
        name="SavingGoalList" 
        component={SavingGoalScreen} 
        options={{ title: 'Danh sách mục tiêu' }} 
      />
      <SavingGoalStack.Screen 
        name="SavingGoalAdd" 
        component={SavingGoalAdd} 
        options={{ title: 'Thêm mục tiêu' }} 
      />
      <SavingGoalStack.Screen 
        name="SavingGoalEdit" 
        component={SavingGoalEdit} 
        options={{ title: 'Sửa mục tiêu' }} 
      />
      <SavingGoalStack.Screen 
        name="SavingGoalDetail" 
        component={SavingGoalDetail} 
        options={{ title: 'Chi tiết mục tiêu' }} 
      />
    </SavingGoalStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

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
                return <IconComponent name={iconName} size={size} color={focused ? color : 'black'} />;
              },
          })}
      >
        <Tab.Screen name="Tổng quan" component={HomeScreen} />
        {/* Sử dụng Stack Navigator cho Mục tiêu */}
        <Tab.Screen name="Mục tiêu" component={SavingGoalStackScreen} />
        <Tab.Screen name="Giao dịch" component={TransactionScreen} options={{ tabBarLabel: () => null, tabBarIcon: ({ focused }) => (
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
