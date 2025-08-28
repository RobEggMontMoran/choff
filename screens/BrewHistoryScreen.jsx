import React, { useState, useCallback, useMemo } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import global from "../styles/globalStyles";
import BrewCard from "../components/BrewCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBrews } from "../src/firebase/brews";
import SearchSortBar from "../components/SearchSortBar";

const BrewHistoryScreen = () => {
  const navigation = useNavigation();
  const [brews, setBrews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // state for search
  const [sortOption, setSortOption] = useState("date_desc"); // state for sort

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

  // filtering and sorting logic for brews
  const processedBrews = useMemo(() => {
    let filtered = brews;

    // filter the search query (checking beanName and brewMethod)
    if (searchQuery) {
      filtered = brews.filter(
        (brew) =>
          // Search by the bean's name
          brew.beanName.toLowerCase().includes(searchQuery.toLowerCase()),
        // ||
        // // search by brew notes
        // (brew.notes && brew.notes.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    // Then, sort the filtered list
    const sorted = [...filtered].sort((a, b) => {
      const getDateValue = (brew) => {
        if (brew && brew.date && typeof brew.date.toDate === "function") {
          return brew.date.toDate().getTime();
        }
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
  }, [brews, searchQuery, sortOption]);

  // Card navigation - navigates to the BrewEntry screen and passes the brew data
  const handleCardPress = (brew) => {
    navigation.navigate("BrewEntry", { brew });
  };

  // Add Brew navigation
  const handleAddPress = () => {
    navigation.navigate("BrewEntry");
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

      <View style={global.spacerS} />

      {/* SearchSortBar component */}
      <SearchSortBar
        placeholder="Search brews..."
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

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
            <View style={local.cardWrapper}>
              <BrewCard brew={item} onPress={() => handleCardPress(item)} />
            </View>
          )}
          contentContainerStyle={local.listSpacing}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={local.noResultsText}>No brews match your search.</Text>}
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
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "sienna",
  },
});

export default BrewHistoryScreen;
