import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AllExpenses from './src/screens/AllExpenses';
import ManageExpense from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
            />
            <Stack.Screen name="ManageExpense" component={ManageExpense} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}
