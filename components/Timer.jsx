import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";

/**
 * A self-contained and reusable stopwatch component
 * It manages its own timing logic and communicates the final time
 * back to a parent component via the onTimeChange callback prop
 * @param {function} onTimeChange - Callback to update the time in the parent component
 */
const Timer = ({ onTimeChange }) => {
  const [time, setTime] = useState(0); // Elapsed time in milliseconds
  const [isActive, setIsActive] = useState(false); // Controls whether the timer is running or paused

  // Refs hold values that persist across renders without causing a re-render
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // The timer's core logic, which runs whenever 'isActive' changes
  useEffect(() => {
    if (isActive) {
      // Calculates start time relative to any previously elapsed time
      startTimeRef.current = Date.now() - time;
      // Sets an interval to accurately update the time based on the system clock
      // This prevents the "time-drift" bug from setInterval alone
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 50); // Update every 50ms for a smooth display

      // Cleanup function to clear the interval when the effect stops
      return () => clearInterval(intervalRef.current);
    } else {
      // If the timer is not active, ensure any existing interval is cleared
      clearInterval(intervalRef.current);
    }
  }, [isActive]);

  // Handler for the Start/Pause button
  const handleToggle = () => {
    if (isActive) {
      // When pausing, send the current time back to the parent component
      const finalTimeInSeconds = parseFloat((time / 1000).toFixed(1));
      onTimeChange(finalTimeInSeconds);
    }
    setIsActive(!isActive);
  };

  // Handler for the Reset button
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    // Also reset the time in the parent component
    onTimeChange(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Helper function to format the display from milliseconds to seconds
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
