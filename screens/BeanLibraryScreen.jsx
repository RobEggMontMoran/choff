import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import global from "../styles/globalStyles";
import BeanCard from "../components/BeanCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBeans } from "../src/firebase/beans";
import SearchSortBar from "../components/SearchSortBar";

/**
 * The BeanLibraryScreen fetches and displays a list of all coffee beans
 * belonging to the current user. It allows for searching, sorting, and
 * navigating to add a new bean or edit an existing one
 * Key State:
 * - beans: The raw array of bean objects fetched from Firestore
 * - isLoading: Controls the initial loading indicator
 * - searchQuery: The current text in the search bar
 * - sortOption: The currently selected sorting method
 */
const BeanLibraryScreen = () => {
  const navigation = useNavigation();
  const [beans, setBeans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  // Fetches data every time the screen comes into focus using useFocusEffect
  // This ensures the list is always fresh, reflecting any additions or edits
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
          // Only show the full-screen loader on the very first load
          if (isLoading) {
            setIsLoading(false);
          }
        }
      };
      fetchBeans();
    }, []), // An empty dependency array ensures this callback is created only once
  );

  // Memoised function to process the beans for display
  // This is a performance optimisation that prevents the filtering and sorting
  // logic from re-running on every single render
  const processedBeans = useMemo(() => {
    let filtered = beans;

    // First, filter the list based on the search query
    if (searchQuery) {
      filtered = beans.filter(
        (bean) =>
          bean.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bean.roaster.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bean.origin.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Then, sort the filtered list based on the selected sort option
    const sorted = [...filtered].sort((a, b) => {
      // Helper function to safely get a comparable date value (as a number)
      // This prevents crashes if roastDate is missing from legacy data
      const getDateValue = (bean) => {
        if (bean && bean.roastDate && typeof bean.roastDate.toDate === "function") {
          return bean.roastDate.toDate().getTime();
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
  }, [beans, searchQuery, sortOption]);

  // Navigates to the entry screen in 'edit mode' with the selected bean's data
  const handleCardPress = (bean) => {
    navigation.navigate("BeanEntry", { bean });
  };

  // Navigates to the entry screen in 'add mode'
  const handleAddPress = () => {
    navigation.navigate("BeanEntry");
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
        <Text style={global.headingL}>Bean Library</Text>
        <Text style={global.subheadingM}>Explore your Bean Archive</Text>
      </View>

      <View style={global.spacerS} />

      {/* Reusable component for search and sort controls */}
      <SearchSortBar
        placeholder="Search beans..."
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

      {/* Conditionally render the list or an empty state message */}
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
          data={processedBeans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={local.cardWrapper}>
              <BeanCard bean={item} onPress={() => handleCardPress(item)} />
            </View>
          )}
          contentContainerStyle={local.listSpacing}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={local.noResultsText}>No beans match your search.</Text>}
        />
      )}

      {/* Floating action button to add a new bean */}
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
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "sienna",
  },
});

export default BeanLibraryScreen;
