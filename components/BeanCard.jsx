import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import global from "../styles/globalStyles";
import StarRating from "./StarRating";

// Card rendering function
const BeanCard = ({ bean, onPress }) => {
  return (
    <TouchableOpacity style={local.card} onPress={onPress}>
      <View style={local.contentRow}>
        {/* Left side of card - Bean Info */}
        <View style={local.textColumn}>
          <Text style={global.headingS}>{bean.name}</Text>
          <Text style={global.subheadingM}>{bean.roaster}</Text>
          <Text style={global.subheadingM}>Origin: {bean.origin}</Text>
          <View style={local.ratingRow}>
            <StarRating rating={bean.rating} />
            <Text style={global.subheadingM}>({bean.rating.toFixed(1)})</Text>
          </View>
        </View>

        {/* Right side of card - Photo */}
        {/* <View style={local.photo} /> */}
        {bean.photoUrl ? <Image source={{ uri: bean.photoUrl }} style={local.photo} /> : <View style={local.photo} />}
      </View>
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
    marginBottom: 8,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textColumn: {
    flex: 1,
    paddingRight: 10,
  },
  photo: {
    width: 98,
    height: 98,
    backgroundColor: "tan",
    borderRadius: 5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default BeanCard;
