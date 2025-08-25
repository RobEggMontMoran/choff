import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import global from "../styles/globalStyles";
import BeanCard from "../components/BeanCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBeans } from "../src/firebase/beans";
import SearchSortBar from "../components/SearchSortBar";

const BeanLibraryScreen = () => {
  const navigation = useNavigation();
  const [beans, setBeans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date_desc"); // sorting defaults to newest added first

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

  const processedBeans = useMemo(() => {
    let filtered = beans;

    if (searchQuery) {
      filtered = beans.filter(
        (bean) =>
          bean.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bean.roaster.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bean.origin.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      // Helper function to safely get a comparable date value (as a number)
      const getDateValue = (bean) => {
        // Check if roastDate exists AND if it has the toDate method
        if (bean && bean.roastDate && typeof bean.roastDate.toDate === "function") {
          return bean.roastDate.toDate().getTime(); // Return the numeric timestamp
        }
        // If not, return a very old date (0) to sort it to the end
        return 0;
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

  // Card navigation
  const handleCardPress = (bean) => {
    navigation.navigate("BeanEntry", { bean });
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

      <View style={global.spacerS} />

      {/* SearchSortBar component */}
      <SearchSortBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

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
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "sienna",
  },
});

export default BeanLibraryScreen;
