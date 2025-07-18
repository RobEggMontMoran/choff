import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import global from "../styles/globalStyles";
import StarRating from "./StarRating";

// Card rendering function
const BrewCard = ({ brew, onPress }) => {
  return (
    <TouchableOpacity style={local.card} onPress={onPress}>
      <View style={local.contentRow}>
        {/* Left side of card - Brew Info */}
        <View style={local.textColumn}>
          <Text style={global.headingS}>{brew.beanName}</Text>
          <Text style={global.subheadingM}>
            {brew.dose}g beans - {brew.yieldAmount}g espresso
          </Text>
          <Text style={global.subheadingM}>Date: {brew.date}</Text>
          <View style={local.ratingRow}>
            <StarRating rating={brew.rating} />
            <Text style={global.subheadingM}>({brew.rating.toFixed(1)})</Text>
          </View>
        </View>

        {/* Right side of card - Photo (currently placeholder) */}
        <View style={local.photoPlaceholder} />
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
  photoPlaceholder: {
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

export default BrewCard;
