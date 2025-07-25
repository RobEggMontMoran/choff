import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import global from "../styles/globalStyles";
import dummyBrews from "../data/dummyBrews";
import BrewCard from "../components/BrewCard";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const BrewHistoryScreen = () => {
  const navigation = useNavigation();

  // Card navigation
  const handleCardPress = (brew) => {
    navigation.navigate("Development", { brew }); // placeholder
  };

  // Add Brew navigation
  const handleAddPress = () => {
    navigation.navigate("BrewEntry", { mode: "addBrew" }); // placeholder
  };

  return (
    <SafeAreaView style={global.screenBase}>
      <View style={global.alignCenter}>
        <Text style={global.headingL}>Brew History</Text>
        <Text style={global.subheadingM}>Refine your technique over time</Text>
      </View>

      <View style={global.spacerL} />

      {dummyBrews.length === 0 ? (
        <View style={global.alignCenter}>
          <View style={global.spacerXL} />
          <View style={global.spacerXL} />
          <Text style={global.subheadingL}>No brews recorded yet.</Text>
          <View style={global.spacerS} />
          <Text style={global.subheadingL}>Tap “+” to log your first one!</Text>
        </View>
      ) : (
        <FlatList
          data={dummyBrews}
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
