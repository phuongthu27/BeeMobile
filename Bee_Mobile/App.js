import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';

 function App() {
        return (
          <NavigationContainer>
              <AuthStack />
          </NavigationContainer>
        );
}

export default App;
