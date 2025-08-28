import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import global from "../styles/globalStyles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBeans } from "../src/firebase/beans";
import { getBrews } from "../src/firebase/brews";

/**
 * The HomeScreen serves as the main dashboard for an authenticated user
 * It displays key statistics and provides the primary navigation to other screens
 */
const HomeScreen = () => {
  const navigation = useNavigation();

  // State to hold the fetched data and loading status
  const [beans, setBeans] = useState([]);
  const [brews, setBrews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetches data every time the screen comes into focus to keep stats up-to-date
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          // Fetch both beans and brews data in parallel for efficiency
          const [fetchedBeans, fetchedBrews] = await Promise.all([getBeans(), getBrews()]);
          setBeans(fetchedBeans);
          setBrews(fetchedBrews);
        } catch (error) {
          console.error("Failed to fetch home screen data:", error);
          Alert.alert("Error", "Could not load your data");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, []),
  );

  // Display a loading indicator while the initial data is being fetched
  if (isLoading) {
    return (
      <SafeAreaView style={[global.screenBase, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="saddlebrown" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={global.screenBase}>
      <View style={{ flex: 1 }}>
        <View style={global.alignCenter}>
          <Text style={global.headingL}>Coffee Cupboard</Text>
          <Text style={global.subheadingM}>Brew smarter, not harder ☕️</Text>
        </View>

        <View style={global.spacerM} />

        {/* Section to display user's key statistics */}
        <View style={local.statsRow}>
          <View style={local.statBox}>
            <Text style={global.textLabelM}>Beans Logged</Text>
            <Text style={global.headingM}>{beans.length}</Text>
          </View>

          <View style={local.statBox}>
            <Text style={global.textLabelM}>Brews Recorded</Text>
            <Text style={global.headingM}>{brews.length}</Text>
          </View>
        </View>

        <View style={global.spacerL} />
      </View>

      {/* Main navigation footer */}
      {/* Bean Library Screen */}
      <View style={local.footer}>
        <TouchableOpacity style={local.quickLink} onPress={() => navigation.navigate("BeanLibrary")}>
          <Ionicons name="book" size={30} color="saddlebrown" />
          <Text style={global.subheadingM}>Beans</Text>
        </TouchableOpacity>

        {/* Brew History Screen */}
        <TouchableOpacity style={local.quickLink} onPress={() => navigation.navigate("BrewHistory")}>
          <Ionicons name="cafe" size={30} color="saddlebrown" />
          <Text style={global.subheadingM}>Brews</Text>
        </TouchableOpacity>

        {/* Profile Page (Currently Only contains Log-Out button) */}
        <TouchableOpacity style={local.quickLink} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={30} color="saddlebrown" />
          <Text style={global.subheadingM}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: "oldlace",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "saddlebrown",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "saddlebrown",
    backgroundColor: "oldlace",
  },
  quickLink: {
    alignItems: "center",
  },
});

export default HomeScreen;
