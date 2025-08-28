import React, { useState, useCallback, useMemo } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import global from "../styles/globalStyles";
import BrewCard from "../components/BrewCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBrews } from "../src/firebase/brews";
import SearchSortBar from "../components/SearchSortBar";

/**
 * The BrewHistoryScreen fetches and displays a list of all coffee brews
 * belonging to the current user. It allows for searching, sorting, and
 * navigating to add a new brew or edit an existing one
 * Key State:
 * - brews: The raw array of brew objects fetched from Firestore
 * - isLoading: Controls the initial loading indicator
 * - searchQuery: The current text in the search bar
 * - sortOption: The currently selected sorting method
 */
const BrewHistoryScreen = () => {
  const navigation = useNavigation();
  const [brews, setBrews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  // Fetches data every time the screen comes into focus using useFocusEffect
  // This ensures the list is always fresh, reflecting any additions or edits
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
          // Only show the full-screen loader on the very first load
          if (isLoading) {
            setIsLoading(false);
          }
        }
      };
      fetchBrews();
    }, []), // An empty dependency array ensures this callback is created only once
  );

  // Memoised function to process the brews for display
  // This is a performance optimisation that prevents the filtering and sorting
  // logic from re-running on every single render
  const processedBrews = useMemo(() => {
    let filtered = brews;

    // First, filter the list based on the search query
    if (searchQuery) {
      filtered = brews.filter((brew) =>
        // Search by the associated bean's name
        brew.beanName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Then, sort the filtered list based on the selected sort option
    const sorted = [...filtered].sort((a, b) => {
      // Helper function to safely get a comparable date value (as a number)
      // This prevents crashes if the date field is missing from legacy data
      const getDateValue = (brew) => {
        if (brew && brew.date && typeof brew.date.toDate === "function") {
          return brew.date.toDate().getTime();
        }
        return 0; // Sorts items without a date to the end
      };

      switch (sortOption) {
        case "date_asc":
          return getDateValue(a) - getDateValue(b);
        case "rating_desc":
          return b.rating - a.rating;
        case "rating_asc":
          return a.rating - b.rating;
        case "date_desc":
        default:
          return getDateValue(b) - getDateValue(a);
      }
    });

    return sorted;
  }, [brews, searchQuery, sortOption]);

  // Navigates to the entry screen in 'edit mode' with the selected brew's data
  const handleCardPress = (brew) => {
    navigation.navigate("BrewEntry", { brew });
  };

  // Navigates to the entry screen in 'add mode'
  const handleAddPress = () => {
    navigation.navigate("BrewEntry");
  };

  // Display a loading indicator on the initial app load
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

      <View style={global.spacerS} />

      {/* Reusable component for search and sort controls */}
      <SearchSortBar
        placeholder="Search brews..."
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

      {/* Conditionally render the list or an empty state message */}
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
          data={processedBrews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={global.cardWrapper}>
              <BrewCard brew={item} onPress={() => handleCardPress(item)} />
            </View>
          )}
          contentContainerStyle={global.listSpacing}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={global.noResultsText}>No brews match your search.</Text>}
        />
      )}

      {/* Add new brew button */}
      <TouchableOpacity style={global.floatingButton} onPress={handleAddPress}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BrewHistoryScreen;
