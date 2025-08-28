import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { subscribeToAuthChanges } from "../src/firebase/auth";

// Import all the user-facing screens
import HomeScreen from "../screens/HomeScreen";
import BeanEntryScreen from "../screens/BeanEntryScreen";
import BeanLibraryScreen from "../screens/BeanLibraryScreen";
import BrewEntryScreen from "../screens/BrewEntryScreen";
import BrewHistoryScreen from "../screens/BrewHistoryScreen";
import LogInScreen from "../screens/LogInScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";

const Stack = createNativeStackNavigator();

// Defines the stack of screens available to users who are NOT authenticated
const AuthStack = () => (
  <Stack.Navigator initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Defines the stack of screens available to users who ARE authenticated
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
  </Stack.Navigator>
);

/**
 * The root navigator for the application. It uses an onAuthStateChanged listener
 * to determine if a user is logged in and conditionally renders either the
 * AuthStack (for login/signup) or the AppStack (for the main app).
 */
const StackNavigator = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase's auth state listener
    // This returns an unsubscribe function for cleanup
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      // Set loading to false only after the initial auth check is complete
      setIsLoading(false);
    });
    // Cleanup the subscription when the component unmounts
    return unsubscribe;
  }, []); // An empty dependency array ensures this effect runs only once on mount
  // Display a loading indicator while the initial authentication state is being checked
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="peru" />
      </View>
    );
  }

  // Once the auth check is complete, render the appropriate navigator
  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};

export default StackNavigator;
