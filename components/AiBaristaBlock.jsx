import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import { getBrewSuggestion } from "../src/firebase/services/aiService";
import global from "../styles/globalStyles";

/**
 * A self-contained component that provides the UI for the AI Barista Assistant
 * It manages the API call state and displays the suggestion or any errors
 * @param {object} brewData - The data for the specific brew to be analysed
 */
const AiBaristaBlock = ({ brewData }) => {
  // State to manage the API response and UI
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles the button press to fetch a new suggestion
  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(""); // Clear any previous suggestion before fetching a new one
    try {
      const result = await getBrewSuggestion(brewData);
      setSuggestion(result);
    } catch (err) {
      setError("Failed to get a suggestion. Please try again.");
      console.error("AI suggestion error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={local.card}>
      <Card.Content>
        <View style={global.alignCenter}>
          <Text style={local.cardTitle}>AI Barista Assistant</Text>
          <Text style={global.subheadingM}>Get a tip to improve your next brew</Text>
        </View>
        <View style={global.spacerS} />
        <Button
          icon="robot-happy-outline"
          mode="contained"
          onPress={handleGetSuggestion}
          disabled={isLoading}
          loading={isLoading}
          buttonColor="peru"
        >
          {isLoading ? "Thinking..." : "Get Recommendation"}
        </Button>

        {/* This block conditionally renders the result area only after a request has been made */}
        {(suggestion || error) && !isLoading && (
          <View style={local.resultContainer}>
            <Divider style={local.divider} />
            {/* Renders either the success message or the error message */}
            {suggestion && <Text style={local.suggestionText}>{suggestion}</Text>}
            {error && <Text style={[local.suggestionText, { color: "firebrick" }]}>{error}</Text>}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const local = StyleSheet.create({
  card: {
    backgroundColor: "oldlace",
    marginBottom: 2,
    marginTop: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "saddlebrown",
    marginBottom: 4,
  },
  resultContainer: {
    marginTop: 16,
  },
  divider: {
    marginBottom: 16,
    height: 1,
    backgroundColor: "tan",
  },
  suggestionText: {
    fontSize: 16,
    color: "saddlebrown",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 24,
  },
});

export default AiBaristaBlock;
