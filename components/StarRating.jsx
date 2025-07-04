import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Star rendering function
const StarRating = ({ rating }) => {
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

const local = StyleSheet.create({
  starRow: {
    flexDirection: "row",
    marginVertical: 1,
    marginTop: 6,
  },
});

export default StarRating;
