import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import global from "../styles/globalStyles";
import { FontAwesome } from "@expo/vector-icons";

// Star rendering function
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const totalStars = hasHalfStar ? fullStars + 1 : fullStars;
  const emptyStars = 10 - totalStars;

  // Render stars: full, optional half, then empty — total of 10
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesome key={`full-${i}`} name="star" size={14} color="goldenrod" />);
  }
  if (hasHalfStar) {
    stars.push(<FontAwesome key="half" name="star-half-full" size={14} color="goldenrod" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesome key={`empty-${i}`} name="star-o" size={14} color="goldenrod" />);
  }

  return <View style={local.starRow}>{stars}</View>;
};

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
            {renderStars(bean.rating)}
            <Text style={global.subheadingM}>({bean.rating.toFixed(1)})</Text>
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
  },
  starRow: {
    flexDirection: "row",
    marginVertical: 1,
    marginTop: 6,
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

export default BeanCard;
