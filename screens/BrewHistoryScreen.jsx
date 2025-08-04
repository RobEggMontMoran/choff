import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import global from "../styles/globalStyles";
// import dummyBrews from "../data/dummyBrews";
import BrewCard from "../components/BrewCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBrews } from "../src/firebase/brews";

const BrewHistoryScreen = () => {
  const navigation = useNavigation();
  const [brews, setBrews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // re-fetches data every time the screen loads
  useFocusEffect(
    useCallback(() => {
      const fetchBrews = async () => {
        try {
          const fetchedBrews = await getBrews();
          setBrews(fetchedBrews);
        } catch (error) {
          console.error("Failed to fetch brews:", error);
          Alert.alert("Error", "Could not fetch your brew history.");
        } finally {
          if (isLoading) {
            setIsLoading(false);
          }
        }
      };

      fetchBrews();
    }, []),
  );

  // Card navigation
  const handleCardPress = (brew) => {
    console.log("Navigating to edit brew:", brew.id);
    // navigation.navigate("Development", { brew }); // placeholder
  };

  // Add Brew navigation
  const handleAddPress = () => {
    navigation.navigate("BrewEntry");
    // navigation.navigate("BrewEntry", { mode: "addBrew" }); // placeholder
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[global.screenBase, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="saddlebrown" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={global.screenBase}>
      <View style={global.alignCenter}>
        <Text style={global.headingL}>Brew History</Text>
        <Text style={global.subheadingM}>Refine your technique over time</Text>
      </View>

      <View style={global.spacerL} />

      {brews.length === 0 ? (
        <View style={global.alignCenter}>
          <View style={global.spacerXL} />
          <View style={global.spacerXL} />
          <Text style={global.subheadingL}>No brews recorded yet.</Text>
          <View style={global.spacerS} />
          <Text style={global.subheadingL}>Tap “+” to log your first one!</Text>
        </View>
      ) : (
        <FlatList
          data={brews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={local.cardWrapper}>
              <BrewCard brew={item} onPress={() => handleCardPress(item)} />
            </View>
          )}
          contentContainerStyle={local.listSpacing}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add new brew button */}
      <TouchableOpacity style={local.floatingButton} onPress={handleAddPress}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
  cardWrapper: {
    marginBottom: 12,
  },
  listSpacing: {
    paddingBottom: 40,
  },
  floatingButton: {
    position: "absolute",
    bottom: 40,
    right: 10,
    backgroundColor: "saddlebrown",
    borderRadius: 40,
    padding: 16,
  },
});

export default BrewHistoryScreen;
