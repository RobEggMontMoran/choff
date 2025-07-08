import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import global from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import dummyBeans from "../data/dummyBeans";
import dummyBrews from "../data/dummyBrews";

const HomeScreen = () => {
  const navigation = useNavigation();

  const totalBeans = dummyBeans.length;
  const totalBrews = dummyBrews.length;

  return (
    <SafeAreaView style={global.screenBase}>
      <View style={{ flex: 1 }}>
        <View style={global.alignCenter}>
          <Text style={global.headingL}>Coffee Cupboard</Text>
          <Text style={global.subheadingM}>Brew smarter, not harder ☕️</Text>
        </View>

        <View style={global.spacerM} />

        {/* CTA
      <TouchableOpacity style={local.ctaButton} onPress={() => navigation.navigate("BrewEntry")}>
        <Text style={local.ctaText}>Start a New Brew</Text>
      </TouchableOpacity>
      <View style={global.spacerL} /> */}

        {/* Stats Section */}
        <View style={local.statsRow}>
          <View style={local.statBox}>
            <Text style={global.textLabelM}>Beans Logged</Text>
            <Text style={global.headingM}>{totalBeans}</Text>
          </View>

          <View style={local.statBox}>
            <Text style={global.textLabelM}>Brews Recorded</Text>
            <Text style={global.headingM}>{totalBrews}</Text>
          </View>
        </View>

        <View style={global.spacerL} />
      </View>

      {/* Quick Links */}
      <View style={local.footer}>
        <TouchableOpacity style={local.quickLink} onPress={() => navigation.navigate("BeanLibrary")}>
          <Ionicons name="book" size={30} color="saddlebrown" />
          <Text style={global.subheadingM}>Beans</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.quickLink} onPress={() => navigation.navigate("BrewHistory")}>
          <Ionicons name="cafe" size={30} color="saddlebrown" />
          <Text style={global.subheadingM}>Brews</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.quickLink} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={30} color="saddlebrown" />
          <Text style={global.subheadingM}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
  // ctaButton: {
  //   backgroundColor: "saddlebrown",
  //   paddingVertical: 16,
  //   paddingHorizontal: 30,
  //   borderRadius: 12,
  //   alignItems: "center",
  // },
  // ctaText: {
  //   color: "white",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: "oldlace",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "saddlebrown",
  },
  // quickLinksRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  //   marginTop: 20,
  // },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    // borderTopWidth: 1,
    borderWidth: 1,
    borderColor: "saddlebrown",
    backgroundColor: "oldlace",
  },
  quickLink: {
    alignItems: "center",
  },
});

export default HomeScreen;
