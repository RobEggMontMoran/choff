import { View, Text, StyleSheet } from "react-native";
import global from "../styles/globalStyles";

const ComponentsTestingScreen = () => {
  return (
    <View style={global.screenCentered}>
      <Text style={global.textLabelXL}>Components Testing Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ComponentsTestingScreen;
