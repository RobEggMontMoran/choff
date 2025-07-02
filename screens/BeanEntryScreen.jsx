import { View, Text, StyleSheet } from "react-native";
import global from "../styles/globalStyles";

const BeanEntryScreen = () => {
  return (
    <View style={global.screenBase}>
      <View style={global.alignCenter}>
        <Text style={global.headingL}>Bean Library</Text>
        <Text style={global.subheadingM}>Add New Coffee Beans or Editing Existing Ones</Text>
      </View>
    </View>
  );
};

export default BeanEntryScreen;
