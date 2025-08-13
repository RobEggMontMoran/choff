import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";

const Timer = ({ onTimeChange }) => {
  // Timer's internal state
  const [time, setTime] = useState(0); // Holds the elapsed time in milliseconds
  const [isActive, setIsActive] = useState(false); // Tracks if the timer is running

  // The timer's core logic
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Handler for the Start/Pause button
  const handleToggle = () => {
    if (isActive) {
      const finalTimeInSeconds = parseFloat((time / 1000).toFixed(1));
      // Use the prop to send the final time back up to the parent screen
      onTimeChange(finalTimeInSeconds);
    }
    setIsActive(!isActive);
  };

  // Handler for the Reset button
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    // Use the prop to reset the time in the parent screen
    onTimeChange(0);
  };

  // Helper function to format the display
  const formatTime = (timeInMilliseconds) => {
    return (timeInMilliseconds / 1000).toFixed(1);
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.timerControls}>
        <Button mode="contained" onPress={handleToggle} buttonColor="peru">
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button mode="outlined" onPress={handleReset} textColor="saddlebrown">
          Reset
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    marginBottom: 25,
    paddingVertical: 10,
    backgroundColor: "oldlace",
    borderRadius: 12,
  },
  timerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "saddlebrown",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  timerControls: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },
});

export default Timer;
