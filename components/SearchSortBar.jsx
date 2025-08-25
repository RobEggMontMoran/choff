import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar, Button, Menu } from "react-native-paper";

const SearchSortBar = ({ searchQuery, onSearchQueryChange, sortOption, onSortOptionChange }) => {
  //state to control the visibility of the sort menu
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSortSelect = (option) => {
    onSortOptionChange(option); // Call the function passed from the parent screen
    closeMenu(); // Close the menu after selection
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
      <Searchbar
        placeholder="Search beans..."
        onChangeText={onSearchQueryChange}
        value={searchQuery}
        style={styles.searchbar}
        iconColor="saddlebrown"
        placeholderTextColor="sienna"
        inputStyle={{ color: "saddlebrown" }}
      />

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
    marginBottom: 15,
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
