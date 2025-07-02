import { View, Text } from "react-native";
import gs from "../styles/globalStyles";

const BeanEntryScreen = () => {
  return (
    <View style={gs.mainContainer}>
      <View style={gs.headingContainer}>
        <Text style={gs.smallHeadingText}>Bean Library</Text>
        <Text style={gs.subHeadingText}>Add New Coffee Beans or Editing Existing Ones</Text>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "blanchedalmond",
//   },
//   headingContainer: {
//     alignItems: "center",
//     marginTop: 15,
//     marginBottom: 80,
//   },
//   headingText: {
//     fontSize: 40,
//     fontWeight: "bold",
//     color: "saddlebrown",
//     letterSpacing: 3,
//   },
//   subHeadingText: {
//     fontSize: 15,
//     color: "sienna",
//     marginTop: 4,
//     letterSpacing: 1,
//   },
// });

export default BeanEntryScreen;
