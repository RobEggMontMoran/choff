import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import global from "../styles/globalStyles";
// import dummyBeans from "../data/dummyBeans";
import BeanCard from "../components/BeanCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBeans } from "../src/firebase/beans";

const BeanLibraryScreen = () => {
  const navigation = useNavigation();
  const [beans, setBeans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useFocusEffect re-fetches data every time the screen loads
  // This ensures the list is updated after adding a new bean
  useFocusEffect(
    useCallback(() => {
      const fetchBeans = async () => {
        try {
          const fetchedBeans = await getBeans();
          setBeans(fetchedBeans);
        } catch (error) {
          console.error("Failed to fetch beans:", error);
          Alert.alert("Error", "Could not fetch your beans. Please try again later.");
        } finally {
          // Ensure loading is set to false after the first fetch
          if (isLoading) {
            setIsLoading(false);
          }
        }
      };

      fetchBeans();
    }, []), // The empty dependency array means the fetch logic is created once
  );

  // Card navigation
  const handleCardPress = (bean) => {
    // **NB - add edit screen logic later
    console.log("Navigating to edit bean:", bean.id);
    // navigation.navigate("BeanEntry", { bean });
  };

  // Add Bean navigation
  const handleAddPress = () => {
    navigation.navigate("BeanEntry");
  };

  // Shows a loading spinner on the initial load
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
        <Text style={global.headingL}>Bean Library</Text>
        <Text style={global.subheadingM}>Explore your Bean Archive</Text>
      </View>

      <View style={global.spacerL} />

      {/* Message for empty lists */}
      {beans.length === 0 ? (
        <View style={global.alignCenter}>
          <View style={global.spacerXL} />
          <View style={global.spacerXL} />
          <Text style={global.subheadingL}>No beans logged yet.</Text>
          <View style={global.spacerS} />
          <Text style={global.subheadingL}>Tap “+” to add your first one!</Text>
        </View>
      ) : (
        // BeanCard list - updated with live firestore data
        <FlatList
          data={beans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={local.cardWrapper}>
              <BeanCard bean={item} onPress={() => handleCardPress(item)} />
            </View>
          )}
          contentContainerStyle={local.listSpacing}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add new bean button */}
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

export default BeanLibraryScreen;
