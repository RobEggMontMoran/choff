import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogInScreen from "../screens/LogInScreen";
import HomeScreen from "../screens/HomeScreen";
import BeanEntryScreen from "../screens/BeanEntryScreen";
import BrewEntryScreen from "../screens/BrewEntryScreen";
import BrewHistoryScreen from "../screens/BrewHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BeanEntry" component={BeanEntryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BrewEntry" component={BrewEntryScreen} />
        <Stack.Screen name="BrewHistory" component={BrewHistoryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
