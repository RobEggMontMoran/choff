import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

/**
 * A presentational component that renders a visual star rating out of 10
 * It takes a numerical rating and displays the corresponding full, half, and empty stars
 * @param {number} rating - The numerical rating to display, e.g., 8.5
 */
const StarRating = ({ rating }) => {
  const stars = [];

  // Calculate the number of each type of star to render
  const fullStars = Math.floor(rating);
  // A half star is shown for any decimal part between .25 and .74
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const totalStars = hasHalfStar ? fullStars + 1 : fullStars;
  const emptyStars = 10 - totalStars;

  // Build the array of star icons: full, then optional half, then empty
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
