import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import global from "../styles/globalStyles";

const BeanLibraryScreen = () => {
  return (
    <View style={global.screenBase}>
      <View style={global.alignCenter}>
        <Text style={global.headingL}>Bean Library</Text>
        {/* <Text style={global.subheadingM}>Add New Coffee Beans or Editing Existing Ones</Text> */}
        <Text style={global.subheadingM}>Explore your Bean Archive</Text>
      </View>
    </View>
  );
};

export default BeanLibraryScreen;
