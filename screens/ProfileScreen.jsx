import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { logoutUser } from "../src/firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import global from "../styles/globalStyles";

const ProfileScreen = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      // logoutUser listerer will process on stackNavigator file and redirect user to Auth screens
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

const styles = StyleSheet.create({});

export default ProfileScreen;
