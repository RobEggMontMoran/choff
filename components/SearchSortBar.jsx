import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchSortBar = ({ searchQuery, onSearchQueryChange }) => {
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
});

export default SearchSortBar;
