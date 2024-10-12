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
//Transaction
import ExpenseList from './screens/TransactionSrceen/ExpenseSrceen/ExpenseList';
import ExpenseAdd from './screens/TransactionSrceen/ExpenseSrceen/ExpenseAdd';
import ExpenseEdit from './screens/TransactionSrceen/ExpenseSrceen/ExpenseEdit';
import ExpenseDetail from './screens/TransactionSrceen/ExpenseSrceen/ExpenseDetail';
import IncomeList from './screens/TransactionSrceen/IncomeSrceen/IncomeList';
import IncomeAdd from './screens/TransactionSrceen/IncomeSrceen/IncomeAdd';
import IncomeEdit from './screens/TransactionSrceen/IncomeSrceen/IncomeEdit';
import IncomeDetail from './screens/TransactionSrceen/IncomeSrceen/IncomeDetail';
import AddTransactionScreen from './screens/TransactionSrceen/AddTransactionScreen';

const SavingGoalStack = createStackNavigator();
const TransactionStack = createStackNavigator();

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

function HomeScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                Home Screen
            </Text>
        </View>
    );
}

function TransactionStackScreen() {
  return (
    <TransactionStack.Navigator>
      <TransactionStack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ title: 'Thêm giao dịch' }}
      />
       {/* Expenses */}
      <TransactionStack.Screen name="ExpenseList" component={ExpenseList} options={{ title: 'Danh sách chi tiêu' }} />
      <TransactionStack.Screen name="ExpenseAdd" component={ExpenseAdd} options={{ title: 'Thêm chi tiêu' }} />
      <TransactionStack.Screen name="ExpenseEdit" component={ExpenseEdit} options={{ title: 'Sửa chi tiêu' }} />
      <TransactionStack.Screen name="ExpenseDetail" component={ExpenseDetail} options={{ title: 'Chi tiết chi tiêu' }} />

      {/* Incomes */}
      <TransactionStack.Screen name="IncomeList" component={IncomeList} options={{ title: 'Danh sách thu nhập' }} />
      <TransactionStack.Screen name="IncomeAdd" component={IncomeAdd} options={{ title: 'Thêm thu nhập' }} />
      <TransactionStack.Screen name="IncomeEdit" component={IncomeEdit} options={{ title: 'Sửa thu nhập' }} />
      <TransactionStack.Screen name="IncomeDetail" component={IncomeDetail} options={{ title: 'Chi tiết thu nhập' }} />
    </TransactionStack.Navigator>
  );
}
function BudgetScreen() {
  return (
    <View>
        <Text>
            Budget Screen
        </Text>
    </View>
    );
}
function ProfileScreen() {
  return (
    <View>
        <Text>
            Profile Screen
        </Text>
    </View>
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
        {/* Sử dụng Stack Navigator cho Mục tiêu */}
        <Tab.Screen name="Mục tiêu" component={SavingGoalStackScreen} />
        <Tab.Screen name="Giao dịch" component={TransactionStackScreen} options={{ tabBarLabel: () => null, tabBarIcon: ({ focused }) => (
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
