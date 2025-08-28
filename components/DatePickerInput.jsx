import React, { useState } from "react";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * A reusable component that provides a styled text input that opens the native date picker
 * It is designed to safely handle different date formats that may come from Firebase
 * @param {string} label - The label to display on the text input
 * @param {Date|object} dateValue - The current date value (can be a JS Date or a Firebase Timestamp)
 * @param {function} onDateChange - The callback function to update the date in the parent
 */
const DatePickerInput = ({ label, dateValue, onDateChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * A helper function to safely convert the incoming dateValue into a valid JS Date object
   * This is crucial for stability, as the date could be a Firebase Timestamp (from legacy data)
   * or a standard JS Date (for new entries). It defaults to the current
   * date if the value is null or invalid, preventing crashes
   */
  const getSafeDate = () => {
    if (dateValue && typeof dateValue.toDate === "function") {
      return dateValue.toDate();
    }
    if (dateValue instanceof Date) {
      return dateValue;
    }
    return new Date();
  };

  const currentDate = getSafeDate();

  const onChangeDate = (event, selectedDate) => {
    // Always hide the picker after the user interacts with it
    setShowDatePicker(false);
    // Only update the parent's state if the user selected a date (i.e., didn't press cancel)
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View>
      {/* This TouchableOpacity makes the entire input area tappable */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowDatePicker(true)}>
        {/* The pointerEvents="none" trick makes the TextInput below un-editable, 
            so it acts purely as a display area for the TouchableOpacity */}
        <View pointerEvents="none">
          <TextInput
            label={label}
            value={currentDate.toLocaleDateString("en-GB")}
            style={local.input}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="calendar" />}
          />
        </View>
      </TouchableOpacity>

      {/* The native date picker modal, which is only rendered when showDatePicker is true */}
      {showDatePicker && <DateTimePicker value={currentDate} mode="date" display="default" onChange={onChangeDate} />}
    </View>
  );
};

const local = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: "oldlace",
  },
});

export default DatePickerInput;
