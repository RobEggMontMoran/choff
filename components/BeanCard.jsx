import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import global from "../styles/globalStyles";

const BeanCard = ({ bean, onPress }) => {
  return (
    <TouchableOpacity style={local.card} onPress={onPress}>
      <Text style={global.textLabelL}>{bean.name}</Text>
      <Text style={global.subheadingM}>{bean.roaster}</Text>
      <Text style={global.subheadingM}>Rating: {bean.rating} / 5</Text>
      <Text style={global.subheadingM}>Origin: {bean.origin}</Text>
    </TouchableOpacity>
  );
};

const local = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "saddlebrown",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "oldlace",
  },
});

export default BeanCard;
