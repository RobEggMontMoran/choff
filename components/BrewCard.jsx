import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import global from "../styles/globalStyles";
import StarRating from "./StarRating";

/**
 * A presentational component that displays a summary of a single coffee brew
 * It receives a 'brew' object as a prop and renders the key recipe details
 * The 'onPress' prop makes the entire card tappable to navigate to the details screen
 * @param {object} brew - The brew data object
 * @param {function} onPress - The function to call when the card is pressed
 */
const BrewCard = ({ brew, onPress }) => {
  // Safely formats the date from a Firebase Timestamp to a readable string
  // This prevents crashes if the date field is missing or in an unexpected format
  const formattedDate = brew.date?.toDate ? brew.date.toDate().toLocaleDateString("en-GB") : "No date";

  return (
    <TouchableOpacity style={local.card} onPress={onPress}>
      <View style={local.contentRow}>
        {/* Main content column for the brew's textual information */}
        <View style={local.textColumn}>
          <Text style={global.headingS}>{brew.beanName}</Text>
          <Text style={global.subheadingM}>
            {brew.dose}g in - {brew.yieldAmount}g out
          </Text>
          <Text style={global.subheadingM}>Date: {formattedDate}</Text>
          <View style={local.ratingRow}>
            <StarRating rating={brew.rating} />
            <Text style={global.subheadingM}>({brew.rating.toFixed(1)})</Text>
          </View>
        </View>

        {/* Conditionally renders the user's photo, or a placeholder if none exists */}
        {brew.photoUrl ? <Image source={{ uri: brew.photoUrl }} style={local.photo} /> : <View style={local.photo} />}
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

export default BrewCard;
