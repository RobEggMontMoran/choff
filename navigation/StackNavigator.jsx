import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

// subscription function
import { subscribeToAuthChanges } from "../src/firebase/auth";

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

// Stack for users who are NOT authenticated
const AuthStack = () => (
  <Stack.Navigator initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Stack for users who ARE authenticated
const AppStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BeanEntry" component={BeanEntryScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BeanLibrary" component={BeanLibraryScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BrewEntry" component={BrewEntryScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BrewHistory" component={BrewHistoryScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ headerShown: false }} />
    {/* Dev Screens */}
    <Stack.Screen name="Development" component={DevelopmentScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ComponentTesting" component={ComponentTestingScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const StackNavigator = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      console.log("Auth State Changed:", currentUser ? "User logged in" : "No user");
      setUser(currentUser);
      setIsLoading(false); // Only set loading to false after auth state is confirmed
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []); // Empty dependency array ensures this runs only once

  if (isLoading) {
    // If still checking for user's state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="peru" />
      </View>
    );
  }

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};

// const StackNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Development">
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="BeanEntry" component={BeanEntryScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="BeanLibrary" component={BeanLibraryScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="BrewEntry" component={BrewEntryScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="BrewHistory" component={BrewHistoryScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="ComponentTesting" component={ComponentTestingScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//         <Stack.Screen name="Settings" component={SettingsScreen} />
//         <Stack.Screen name="Analytics" component={AnalyticsScreen} />
//         <Stack.Screen name="Development" component={DevelopmentScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default StackNavigator;
