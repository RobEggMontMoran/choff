import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { logoutUser } from "../src/firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import global from "../styles/globalStyles";

/**
 * The ProfileScreen currently serves as the primary location for user account actions
 * At present, its only functionality is to allow the user to log out
 */
const ProfileScreen = () => {
  // Handles the user logout process
  const handleLogout = async () => {
    try {
      // The onAuthStateChanged listener in StackNavigator handles redirecting the user to the Auth screens
      await logoutUser();
    } catch (error) {
      Alert.alert("Logout Failed", "An error occurred while logging out. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <SafeAreaView style={global.screenBase}>
      <View style={global.alignCenter}>
        <Text style={global.headingL}>Profile</Text>
        <View style={global.spacerXL} />
        <Button title="Log Out" onPress={handleLogout} color="firebrick" />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
