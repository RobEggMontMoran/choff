import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";

const Timer = ({ onTimeChange }) => {
  const [time, setTime] = useState(0); // Elapsed time in milliseconds
  const [isActive, setIsActive] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // The timer's core logic
  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 50);
      return () => clearInterval(intervalRef.current);
    } else {
      clearInterval(intervalRef.current);
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
    onTimeChange(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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
