import { View, Text, StyleSheet, ScrollView } from "react-native";
import global from "../styles/globalStyles";
import dummyBeans from "../data/dummyBeans";
import { Ionicons } from "@expo/vector-icons";

const ComponentsTestingScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
      <View style={global.screenBase}>
        {dummyBeans.map((bean) => (
          <View key={bean.id} style={local.card}>
            <Text style={global.textLabelL}>{bean.name}</Text>
            <Text style={global.subheadingM}>{bean.roaster}</Text>
            <Text style={global.subheadingM}>Rating: {bean.rating} Stars</Text>
            <Text style={global.subheadingM}>Origin: {bean.origin}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const local = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "saddlebrown",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "oldlace",
  },
});

export default ComponentsTestingScreen;
