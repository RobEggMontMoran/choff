import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar, Button, Menu } from "react-native-paper";

/**
 * A reusable UI component that provides a search input field and a sort menu
 * It is a controlled component, meaning it receives its state and the functions
 * to update that state as props from its parent screen
 * @param {string} searchQuery - The current value of the search input
 * @param {function} onSearchQueryChange - Callback function to update the search query
 * @param {string} sortOption - The currently selected sort option
 * @param {function} onSortOptionChange - Callback function to update the sort option
 */
const SearchSortBar = ({ placeholder, searchQuery, onSearchQueryChange, sortOption, onSortOptionChange }) => {
  // Local state to control the visibility of the sort menu
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Handles the selection of a new sort option
  const handleSortSelect = (option) => {
    onSortOptionChange(option); // Call the function passed from the parent screen
    closeMenu(); // Closes the menu after selection
  };

  // Helper function to display a user-friendly label for the current sort option
  const getSortLabel = () => {
    switch (sortOption) {
      case "date_desc":
        return "Date (Newest)";
      case "date_asc":
        return "Date (Oldest)";
      case "rating_desc":
        return "Rating (High-Low)";
      case "rating_asc":
        return "Rating (Low-High)";
      default:
        return "Sort By";
    }
  };

  return (
    <View style={styles.container}>
      {/* The main search input field */}
      <Searchbar
        placeholder={placeholder || "Search..."}
        onChangeText={onSearchQueryChange}
        value={searchQuery}
        style={styles.searchbar}
        iconColor="saddlebrown"
        placeholderTextColor="sienna"
        inputStyle={{ color: "saddlebrown" }}
      />

      {/* The dropdown menu for sorting options */}
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} icon="sort" textColor="saddlebrown" style={styles.sortButton}>
            {getSortLabel()}
          </Button>
        }
      >
        <Menu.Item onPress={() => handleSortSelect("date_desc")} title="Date (Newest First)" />
        <Menu.Item onPress={() => handleSortSelect("date_asc")} title="Date (Oldest First)" />
        <Menu.Item onPress={() => handleSortSelect("rating_desc")} title="Rating (High to Low)" />
        <Menu.Item onPress={() => handleSortSelect("rating_asc")} title="Rating (Low to High)" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  searchbar: {
    backgroundColor: "oldlace",
    borderWidth: 1,
    borderColor: "saddlebrown",
  },
  sortButton: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
});

export default SearchSortBar;
