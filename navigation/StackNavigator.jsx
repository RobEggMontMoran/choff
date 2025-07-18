import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import BeanEntryScreen from "../screens/BeanEntryScreen";
import BeanLibraryScreen from "../screens/BeanLibraryScreen";
import BrewEntryScreen from "../screens/BrewEntryScreen";
import BrewHistoryScreen from "../screens/BrewHistoryScreen";
import LogInScreen from "../screens/LogInScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import ComponentTestingScreen from "../screens/ComponentTestingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import DevelopmentScreen from "../screens/DevelopmentScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Development">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BeanEntry" component={BeanEntryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BeanLibrary" component={BeanLibraryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BrewEntry" component={BrewEntryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BrewHistory" component={BrewHistoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ComponentTesting" component={ComponentTestingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Development" component={DevelopmentScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
