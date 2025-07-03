import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import global from "../styles/globalStyles";
import dummyBeans from "../data/dummyBeans";
import BeanCard from "../components/BeanCard";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const BeanLibraryScreen = () => {
  const navigation = useNavigation();

  // Card navigation
  const handleCardPress = (bean) => {
    navigation.navigate("ComponentTesting", { bean }); // placeholder
  };

  // Add Bean navigation
  const handleAddPress = () => {
    navigation.navigate("ComponentTesting", { mode: "add" }); // placeholder
  };

  return (
    <SafeAreaView style={global.screenBase}>
      <View style={global.alignCenter}>
        <Text style={global.headingL}>Bean Library</Text>
        <Text style={global.subheadingM}>Explore your Bean Archive</Text>
      </View>

      <View style={global.spacerL} />

      {/* Message for Empty Lists */}
      {dummyBeans.length === 0 ? (
        <View style={global.alignCenter}>
          <View style={global.spacerXL} />
          <View style={global.spacerXL} />
          <Text style={global.subheadingL}>No beans logged yet.</Text>
          <View style={global.spacerS} />
          <Text style={global.subheadingL}>Tap “+” to add your first one!</Text>
        </View>
      ) : (
        // BeanCard List
        <FlatList
          data={dummyBeans}
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
